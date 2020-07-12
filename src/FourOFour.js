import React from "react";
import { Image } from "react-bootstrap";
export default function FourOhFourPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Image src={process.env.PUBLIC_URL + "/images/pngguru.com.png"} alt="" fluid />
    </div>
  );
}
