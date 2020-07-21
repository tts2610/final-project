import React from "react";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";

export default function AddNewRestaurant() {
  const [isFlipped, setIsFlipped] = useState(false);
  return <ReactCardFlip isFlipped={isFlipped}></ReactCardFlip>;
}
