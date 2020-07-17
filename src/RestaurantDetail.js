import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetail, getMenuByRestaurantID, getDistinctCategory } from "./RestaurantDetailAPI";
import { Container, Badge, Image, Tabs, Tab } from "react-bootstrap";
import { getDistance } from "./components/FoodCard/FoodCardAPI";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MenuCarousel from "./components/MenuCarousel/MenuCarousel";

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
      let distance = await getDistance({ lat1: localStorage.getItem("lat"), lon1: localStorage.getItem("lon"), lat2: restaurant.latitude, lon2: restaurant.longitude });
      setDistance(Math.ceil(distance));

      const categories = await getDistinctCategory(resID);
      setcategories(categories);
    }
    getData();
  }, []);

  if (restaurant)
    return (
      <Container>
        <h1 style={{ textTransform: "capitalize" }}>{restaurant.name}</h1>
        <h1>{restaurant.address}</h1>
        {restaurant.tags.map((item, indx) => (
          <h1>
            <Badge key={indx} variant="success">
              {item.title}
            </Badge>
          </h1>
        ))}
        <h1>
          <i style={{ color: "yellow" }} className="fas fa-star"></i>
          {restaurant.averageRating}
        </h1>
        <h1>{distance} km</h1>
        <Tabs defaultActiveKey={categories[0]} id="uncontrolled-tab-example">
          {categories &&
            categories.map((item, indx) => (
              <Tab eventKey={item} title={item}>
                <MenuCarousel category={item} restaurant={resID} />
              </Tab>
            ))}
        </Tabs>
      </Container>
    );
  return <></>;
}
