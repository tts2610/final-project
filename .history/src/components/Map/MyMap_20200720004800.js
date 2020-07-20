import React, { Component, useState, useEffect } from "react";
import { Spinner, Image } from "react-bootstrap";

import data from "../../urls.json";
import { uploadRestaurants } from "./MyMapAPI";
import { getMenuByRestaurantID } from "../../RestaurantDetailAPI";
import menu_data from "../../menu_urls.json";
import axios from "axios";
var map;

export default function MyMap() {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const renderMap = () => {
    window.initMap = initMap();
  };

  const getMenu = async (id) => {
    let menu = await getMenuByRestaurantID(id);
    if (!menu) {
      menu = [];
      menu_data.forEach(async (element) => {
        element["restaurant_id"] = id;
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/menu/`, element);
        menu.push(element);
        console.log(res);
      });
    }
    let arr = [];
    for (let index = 0; index < 4; index++) {
      const element = menu[index];
      if (element)
        // const item = `<Image width="50" height="50" src=${element.image}></Image>`;
        arr.push(element.image);
    }
    // console.log(arr);
    return arr;
  };

  const initMap = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      setLat(post.coords.latitude);
      setLong(post.coords.longitude);
    });
  };

  const generateData = () => {
    var directionsService = new window.google.maps.DirectionsService();
    var directionsRenderer = new window.google.maps.DirectionsRenderer({ suppressMarkers: true, preserveViewport: true });
    setIsLoading(false);
    let coord = { lat: lat, lng: long };
    map = new window.google.maps.Map(document.getElementById("map"), {
      mapId: "9d284c56bab155df",
      center: coord,
      zoom: 17,
    });

    directionsRenderer.setMap(map);

    var marker = new window.google.maps.Marker({ position: coord, map: map, animation: window.google.maps.Animation.BOUNCE });

    var pyrmont = new window.google.maps.LatLng(lat, long);
    var request = {
      location: pyrmont,
      radius: "1000",
      type: ["restaurant"],
      opennow: true,
    };

    let service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, async (results, status) => {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          if (i === data.length) break;
          let place = results[i];
          data[i]["latitude"] = place.geometry.location.lat().toString();
          data[i]["longitude"] = place.geometry.location.lng().toString();
          // data[i]["distance"] = distance(lat, long, place.geometry.location.lat(), place.geometry.location.lng());
          data[i]["address"] = place.vicinity;
          data[i]["averageRating"] = place.rating;
          data[i]["nRating"] = 1;

          const res = await uploadRestaurants(data[i]);
          // console.log(res);
          let { restaurant } = res;
          // console.log(place);
          var image = {
            url: "/images/restaurant_icon.png",
            size: new window.google.maps.Size(75, 75),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(35, 35),
          };
          let list = await getMenu(restaurant._id);
          // console.log(list)
          // eslint-disable-next-line no-loop-func
          window.setTimeout(function () {
            var contentString = `<h1>${restaurant.name}</h1>
            <div>${list && list.map((item) => `<Image width="80" height="80" src=${item}></Image>`)}</div>
            <a className="mt-3" href="/restaurant/${restaurant.name}+${restaurant._id}">More info</a>`;
            var infowindow = new window.google.maps.InfoWindow({
              content: contentString,
            });
            var marker = new window.google.maps.Marker({
              map: map,
              icon: image,
              title: place.name,
              position: place.geometry.location,
              animation: window.google.maps.Animation.DROP,
            });
            marker.addListener("click", function () {
              infowindow.open(map, marker);
              calcRoute(new window.google.maps.LatLng(lat, long), new window.google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()), directionsService, directionsRenderer);
            });
          }, i * 200);
        }
      }
    });
  };

  function calcRoute(origin, destination, directionsService, directionDisplay) {
    console.log(origin, destination);
    // var selectedMode = document.getElementById('mode').value;
    var request = {
      origin,
      destination,
      // Note that JavaScript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: "DRIVING",
    };
    directionsService.route(request, function (response, status) {
      if (status == "OK") {
        console.log(response);
        directionDisplay.setDirections(response);
      }
    });
  }

  function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  const createMarkers = (places) => {
    var bounds = new window.google.maps.LatLngBounds();
    var placesList = document.getElementById("places");

    for (var i = 0, place; (place = places[i]); i++) {
      var image = {
        url: place.icon,
        size: new window.google.maps.Size(71, 71),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25),
      };

      var marker = new window.google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
      });

      var li = document.createElement("li");
      li.textContent = place.name;
      placesList.appendChild(li);

      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
  };

  useEffect(() => {
    setIsLoading(true);
    // axios.get(`http://localhost:5000/restaurants`).then((res) => {
    //   const persons = res.data;
    //   this.setState({ test: persons });
    // });
    renderMap();
  }, []);

  useEffect(() => {
    if (window.google) generateData();
  }, [lat, long]);

  if (!isLoading) {
    return (
      <>
        <div id="map" className="App"></div>
        {/* <div>{this.state.test}</div> */}
      </>
    );
  } else
    return (
      <>
        <Spinner animation="border" variant="danger" />
      </>
    );
}
