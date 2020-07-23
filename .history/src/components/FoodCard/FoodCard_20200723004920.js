import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Col, Row, Badge } from "react-bootstrap";
import "./style.css";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import { getDistance } from "./FoodCardAPI";
import axios from "axios";

export default function FoodCard({ item }) {
  const [distance, setDistance] = useState(0);
  const [countReview, setCountReview] = useState(0);
  const history = useHistory();
  const StyledRating = withStyles({
    iconFilled: {
      color: "#FFFF00",
    },
  })(Rating);

  const cardCliked = () => {
    history.push({ pathname: `/restaurant/${item.name}+${item._id}` });
  };

  useEffect(() => {
    // async function getItemDistance() {
    //   let distance = await getDistance({ lat1: localStorage.getItem("currentLat"), lon1: localStorage.getItem("currentLat"), lat2: item.latitude, lon2: item.longitude });
    //   // distance = distance * 1000;
    //   setDistance(Math.floor(distance)); ${process.env.REACT_APP_API_URL}
    // }
    // getItemDistance();
    async function getReview() {
      const res = await axios.get(`http://localhost:5000/review/${item._id}`);
      const { reviewList } = res.data.data;
      console.log(reviewList.length());
      if (reviewList) setCountReview(reviewList.length);
    }
    getReview();
  }, [item]);

  return (
    <div className="mt-4 mr-4" onClick={cardCliked}>
      <Card id="card-info">
        <Card.Img id="card-img-top" variant="top" width="300" height="210" src={item.image} />
        <Card.ImgOverlay className="text-white img-overlay">
          <Row>
            <Col>{/* <Badge className="py-2 px-2" variant="danger">
                {distance} m
              </Badge> */}</Col>
            <Col></Col>
          </Row>
          <Row className="row-overlay">
            <Col>
              <StyledRating name="half-rating-read" defaultValue={item.averageRating} precision={0.5} readOnly />
            </Col>
            <Col className="badge-col">
              <Badge className="py-2 px-2" variant="info">
                {countReview} reviews
              </Badge>
            </Col>
          </Row>
        </Card.ImgOverlay>
      </Card>
      <Card id="card-info" className="second-card">
        {/* <div className="img-zig-zag"></div> */}
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.address}</Card.Text>
          <Card.Text className="font-weight-bold">{item.phoneNumber}</Card.Text>
          {item.tags.map((item, indx) => (
            <Badge key={indx} style={{ padding: "5px" }} className="mr-2" variant="success">
              {item.title}
            </Badge>
          ))}
        </Card.Body>
        <Row className="address-row">
          <Col sm={9}>
            <Row>
              <Col sm={3} className="restaurant-img">
                <img src="https://codenpixel.com/demo/foodpicky/images/logo2.png"></img>
              </Col>
              <Col sm={9} className="restaurant-info">
                <div className="restaurantName">Chicken Restaurant</div>
                <div className="text-muted">68 5th New York</div>
              </Col>
            </Row>
          </Col>
          <Col sm={3} className="restaurant-ratings">
            <i className="fal fa-heart mr-2"></i> 48
          </Col>
        </Row>
      </Card>
    </div>
  );
}
