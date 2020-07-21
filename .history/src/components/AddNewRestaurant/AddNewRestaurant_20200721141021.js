import React from "react";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";

export default function AddNewRestaurant() {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div>
        This is the front of the card.
        <button onClick={handleClick}>Click to flip</button>
      </div>
      <div>
        This is the back of the card.
        <button onClick={handleClick}>Click to flip</button>
      </div>
    </ReactCardFlip>
  );
}
