import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

export default function Root() {
  return (
    <div className="page root-page">
      <Container>
        <div className="findAdress-form">
          <h5>Good Evening</h5>
          <h1>Let's explore good food near you.</h1>
          <Form className="mt-4">
            <Form.Group controlId="formBasicEmail">
              <Form.Control className="mb-2" type="email" placeholder="Your address..." />
              <Link to="/index">
                <Button className="main-btn">Find</Button>
              </Link>
            </Form.Group>
          </Form>
        </div>
      </Container>
    </div>
  );
}
