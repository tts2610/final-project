import React, { Component } from "react";
import { compose, withProps, withHandlers } from "recompose";
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from "react-google-maps";
import axios from "axios";

var map;

export default class MyMap extends Component {
  state = {
    lat: 0,
    long: 0,
    isLoading: false,
    test: "",
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/restaurants`).then((res) => {
      const persons = res.data;
      this.setState({ test: persons });
    });
    this.renderMap();
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=AIzaSyCKVwMiyorLkBwg5hZdYnPKneqTEnvyTvQ&map_ids=9d284c56bab155df&callback=initMap");
    window.initMap = this.initMap;
  };

  initMap = () => {
    window.navigator.geolocation.getCurrentPosition((post) => {
      this.setState({ lat: post.coords.latitude, long: post.coords.longitude }, () => {
        let coord = { lat: this.state.lat, lng: this.state.long };
        map = new window.google.maps.Map(document.getElementById("map"), {
          mapId: "9d284c56bab155df",
          center: coord,
          zoom: 17,
        });
        var marker = new window.google.maps.Marker({ position: coord, map: map, animation: window.google.maps.Animation.BOUNCE });

        var pyrmont = new window.google.maps.LatLng(this.state.lat, this.state.long);
        var request = {
          location: pyrmont,
          radius: "1000",
          type: ["restaurant"],
          opennow: true,
        };

        let service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
          if (status == window.google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
              let place = results[i];
              // console.log(place.geometry.location.lat());
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
      });
    });
  };

  render() {
    if (!this.state.isLoading)
      return (
        <>
          <div id="map" className="App"></div>
          <div>{this.state.test}</div>
        </>
      );
    else return <></>;
  }

  createMarkers(places) {
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
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
