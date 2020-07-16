import React, { useState, useEffect } from "react";
import "./App.css";
// import MyMap from "./components/MyMap";
import FoodCard from "./components/FoodCard/FoodCard";
import { CardDeck, Container, Button, Spinner } from "react-bootstrap";
import parse from "html-react-parser";
// import axios from "axios";
import Header from "./components/Header/Header";
import LoginModal from "./components/LoginModal/LoginModal";
import SignupModal from "./components/SignupModal/SignupModal";
import { Link } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { getRestaurantList } from "./AppAPI";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  // state = {
  //   desc: "<h1>sdcsDC</h1>",
  // };
  // const [desc, setDesc] = useState("");

  useEffect(async () => {
    const res = await getRestaurantList();
    if (!(res instanceof Error)) {
      setRestaurants(res);

      if (!localStorage.getItem("lat") && !localStorage.getItem("lon")) {
        navigator.geolocation.getCurrentPosition(function (position) {
          localStorage.setItem("lat", position.coords.latitude);
          localStorage.setItem("lon", position.coords.longitude);
        });
      }
    }
  }, []);

  return (
    <div className="page">
      <Header />
      <Container className="mt-2">
        {/* <div>{parse(`${desc}`)}</div> */}
        {/* <MyMap></MyMap> */}

        <CardDeck>
          {restaurants.length > 0 ? (
            restaurants.map((item, indx) => {
              return <FoodCard key={indx} item={item}></FoodCard>;
            })
          ) : (
            <Spinner animation="border" variant="danger" />
          )}

          {/* <FoodCard></FoodCard>
          <FoodCard></FoodCard> */}
        </CardDeck>

        {/* <Link to="/root">
          <Button>Root</Button>
        </Link> */}
      </Container>
      <Footer />

      <LoginModal />
      <SignupModal />
    </div>
  );
}
