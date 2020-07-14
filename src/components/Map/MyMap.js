import React, { Component, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

import data from "../../urls.json";
import { uploadRestaurants } from "./MyMapAPI";

var map;

export default function MyMap() {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const renderMap = () => {
    window.initMap = initMap();
  };

  const initMap = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      setLat(post.coords.latitude);
      setLong(post.coords.longitude);
    });
  };

  const generateData = () => {
    setIsLoading(false);
    let coord = { lat: lat, lng: long };
    map = new window.google.maps.Map(document.getElementById("map"), {
      mapId: "9d284c56bab155df",
      center: coord,
      zoom: 17,
    });
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
          data[i]["address"] = place.vicinity;
          console.log(data[i]);
          const res = await uploadRestaurants(data[i]);
          console.log(res);
          var image = {
            url: "/images/restaurant_icon.png",
            size: new window.google.maps.Size(75, 75),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(35, 35),
          };
          window.setTimeout(function () {
            var marker = new window.google.maps.Marker({
              map: map,
              icon: image,
              title: place.name,
              position: place.geometry.location,
              animation: window.google.maps.Animation.DROP,
            });
          }, i * 200);
        }
      }
    });
  };

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
