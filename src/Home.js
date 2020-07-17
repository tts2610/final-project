import React, { useState, useEffect } from "react";
import "./App.css";
// import MyMap from "./components/MyMap";
import FoodCard from "./components/FoodCard/FoodCard";
import { CardDeck, Container, Button, Spinner, CardGroup, Row, Col } from "react-bootstrap";
import parse from "html-react-parser";
// import axios from "axios";
import Header from "./components/Header/Header";
import LoginModal from "./components/LoginModal/LoginModal";
import SignupModal from "./components/SignupModal/SignupModal";
import { Link } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { getRestaurantList } from "./AppAPI";
import { useSelector, useDispatch } from "react-redux";
import { insertMenu } from "./HomeAPI";
import Filters from "./components/Filter/Filters";
import axios from "axios";
import Chatbox from "./components/Chatbox/Chatbox";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const searchParams = useSelector((state) => state.searchParams);
  const [isFiltering, setIsFiltering] = useState(false);
  const dispatch = useDispatch();

  // state = {
  //   desc: "<h1>sdcsDC</h1>",
  // };
  // const [desc, setDesc] = useState("");

  const performFilter = (params) => {
    let searchUrl = `http://localhost:5000/restaurants/search?tags=${params.tags}&averageRatingMin=${params.averageRating ? params.averageRating : ""}&page=${params.page}&&perPage=6`;
    axios.get(searchUrl).then(function (res) {
      // setTotalPage(res.data.data.pagination.totalPages);

      setRestaurants(res.data.data.restaurantList);
      setIsFiltering(false);
    });
  };

  useEffect(() => {
    let res = null;
    async function getRes() {
      res = await getRestaurantList();
    }

    getRes();

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

  const filterByRating = (avgRating) => {
    dispatch({ type: "FILTER", payload: { searchParams: { averageRating: avgRating, perPage: undefined }, isFiltering: true } });
  };

  useEffect(() => {
    setIsFiltering(true);
    performFilter(searchParams);
    async function getMenu() {
      const menu = await insertMenu();
    }
    getMenu();
  }, [searchParams]);

  return (
    <div className="page">
      <Header />

      {/* <div>{parse(`${desc}`)}</div> */}
      {/* <MyMap></MyMap> */}

      <Row className="mx-5">
        <Col sm={3} className="mt-4">
          <div className="mb-3" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div onClick={() => filterByRating(5)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              5 stars <Rating name="read-only" value={5} readOnly size="large" />
            </div>
            <div onClick={() => filterByRating(4)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              4 stars <Rating name="read-only" value={4} readOnly size="large" />
            </div>
            <div onClick={() => filterByRating(3)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              3 stars <Rating name="read-only" value={3} readOnly size="large" />
            </div>
            <div onClick={() => filterByRating(2)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              2 stars <Rating name="read-only" value={2} readOnly size="large" />
            </div>
            <div onClick={() => filterByRating(1)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              1 stars <Rating name="read-only" value={1} readOnly size="large" />
            </div>
          </div>

          <Filters />
        </Col>
        <Col sm={9}>
          <div style={{ display: "flex", justifyContent: "center" }} className={isFiltering ? "blur" : ""}>
            <CardGroup style={{ margin: "0 auto 0 auto" }}>
              {restaurants ? (
                restaurants.map((item, indx) => {
                  return <FoodCard key={indx} item={item}></FoodCard>;
                })
              ) : (
                <Spinner animation="border" variant="danger" />
              )}
            </CardGroup>
          </div>
        </Col>
      </Row>

      {/* <Link to="/root">
          <Button>Root</Button>
        </Link> */}
      <Chatbox />

      <Footer />

      <LoginModal />
      <SignupModal />
    </div>
  );
}
