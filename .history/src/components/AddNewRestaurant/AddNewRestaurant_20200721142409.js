import React from "react";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function AddNewRestaurant() {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Address" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleClick}>
            Click to flip
          </Button>
        </Form>
      </div>
      <div>
        This is the back of the card.
        <button onClick={handleClick}>Click to flip</button>
      </div>
    </ReactCardFlip>
  );
}
