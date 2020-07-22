import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetail, getMenuByRestaurantID, getDistinctCategory } from "./RestaurantDetailAPI";
import { Container, Badge, Image, Tabs, Tab, Col, Row } from "react-bootstrap";
import { getDistance } from "./components/FoodCard/FoodCardAPI";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MenuCarousel from "./components/MenuCarousel/MenuCarousel";
import Rating from "./components/Rattings&Review/Rating";
import Header from "./components/Header/Header";
import parse from "html-react-parser";

export default function RestaurantDetail() {
  const param = useParams();
  const resID = param.res.split("+")[1];

  const [restaurant, setrestaurant] = useState();

  const [categories, setcategories] = useState([]);

  const [distance, setDistance] = useState();

  useEffect(() => {
    async function getData() {
      const data = await getDetail(resID);
      const { restaurant } = data;
      setrestaurant(restaurant);

      let distance = await getDistance({ lat1: localStorage.getItem("currentLat"), lon1: localStorage.getItem("currentLng"), lat2: restaurant.latitude, lon2: restaurant.longitude });
      setDistance(Math.ceil(distance));

      const categories = await getDistinctCategory(resID);
      setcategories(categories);
    }
    getData();
  }, []);

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  if (restaurant)
    return (
      <>
        <Header />
        <Container className="mt-5">
          <Row>
            <Col sm={8}>
              <h2 style={{ textTransform: "capitalize" }}>{restaurant.name}</h2>
              <h3 className="text-muted">{restaurant.address}</h3>
              <div style={{ display: "flex" }}>
                {restaurant.tags.map((item, indx) => (
                  <h4 class="mr-2">
                    <Badge key={indx} variant="success">
                      {item.title}
                    </Badge>
                  </h4>
                ))}
              </div>
              <div style={{ display: "flex" }}>
                <h4>
                  <i style={{ color: "#ffd54f" }} className="fas fa-star"></i>
                  {Math.round(restaurant.averageRating * 10) / 10}
                </h4>
                <h4 className="ml-3">
                  <i style={{ color: "rgb(237, 90, 107)" }} className="fas fa-map-marker-alt"></i>
                  {distance} km
                </h4>
              </div>
            </Col>
            <Col sm={2}>
              <Image fluid width="350" height="350" src={restaurant.image} alt=""></Image>
            </Col>
          </Row>

          <Tabs className="mt-5" defaultActiveKey={categories[0]} id="uncontrolled-tab-example">
            {categories &&
              categories.map((item, indx) => (
                <Tab key={indx} eventKey={item.capitalize()} title={item.capitalize()}>
                  <MenuCarousel category={item} restaurant={resID} />
                </Tab>
              ))}
          </Tabs>

          <div className="mt-3" style={{ backgroundColor: "rgb(247, 247, 247)", padding: "20px" }}>
            <h1 style={{ textDecoration: "underline" }}>Introduction:</h1>
            <Container>{parse(`${restaurant.introduction}`)}</Container>
          </div>

          <Rating restaurant={restaurant} />
        </Container>
      </>
    );
  return <></>;
}
