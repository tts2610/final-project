import React from "react";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";

export default function AddNewRestaurant() {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div>
        This is the front of the card.
        <button onClick={this.handleClick}>Click to flip</button>
      </div>
      <div>
        This is the back of the card.
        <button onClick={this.handleClick}>Click to flip</button>
      </div>
    </ReactCardFlip>
  );
}
