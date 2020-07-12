import React from "react";
import { Card, Col, Row, Badge } from "react-bootstrap";
import "./style.css";
export default function FoodCard() {
  return (
    <div>
      <Card id="card-info">
        <Card.Img id="card-img-top" variant="top" src="https://codenpixel.com/demo/foodpicky/images/food1.jpg" />
        <Card.ImgOverlay className="text-white img-overlay">
          <Row>
            <Col>
              <Badge className="py-2 px-2" variant="danger">
                1240m
              </Badge>
            </Col>
            <Col></Col>
          </Row>
          <Row className="row-overlay">
            <Col>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </Col>
            <Col className="badge-col">
              <Badge className="py-2 px-2" variant="info">
                198 reviews
              </Badge>
            </Col>
          </Row>
        </Card.ImgOverlay>
      </Card>
      <Card id="card-info">
        {/* <div className="img-zig-zag"></div> */}
        <Card.Body>
          <Card.Title>The South"s Best Fried Chicken</Card.Title>
          <Card.Text>Fried Chicken with cheese</Card.Text>
          <Card.Text className="font-weight-bold">$ 15,99</Card.Text>
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
