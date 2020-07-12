import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "./style.css";

export default function Footer() {
  return (
    <div className="footer">
      <Row>
        <Col sm={6}>
          <h5>Footer Content</h5>
          <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </Col>
        <Col sm={2}>
          <h5>Links</h5>
          <ul class="list-unstyled">
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </Col>
        <Col sm={2}>
          <h5>Links</h5>
          <ul class="list-unstyled">
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </Col>
        <Col sm={2}>
          <h5>Links</h5>
          <ul class="list-unstyled">
            <li>
              <a href="#!">Link 1</a>
            </li>
            <li>
              <a href="#!">Link 2</a>
            </li>
            <li>
              <a href="#!">Link 3</a>
            </li>
            <li>
              <a href="#!">Link 4</a>
            </li>
          </ul>
        </Col>
      </Row>
      <hr></hr>
      <Row style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        Register for free{" "}
        <Button className="ml-2" variant="danger">
          Signup
        </Button>
      </Row>
      <hr></hr>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <i className="fab fa-facebook fa-3x dark-blue mr-4"></i>
        <Image className="mr-4" src="./images/twitter_icon.png" width="48" height="48" alt=""></Image>
        <Image className="mr-4" src="./images/google_icon.png" width="48" height="48" alt=""></Image>
        <Image src="./images/linkedin_icon.png" width="48" height="48" alt=""></Image>
      </Row>
    </div>
  );
}
