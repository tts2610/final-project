import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Image, Col, Row } from "react-bootstrap";
import { getListByCategory } from "./MenuCarouselAPI";

export default function MenuCarousel({ category, restaurant }) {
  const [menusByID, setMenus] = useState([]);

  useEffect(() => {
    async function getMenuByCategory() {
      const categoryList = await getListByCategory(restaurant, category);
      console.log(categoryList);
      setMenus(categoryList);
    }
    getMenuByCategory();
  }, []);
  return (
    <Row style={{ display: "flex", backgroundColor: "#f7f7f7", padding: "20px" }}>
      {menusByID &&
        menusByID.map((item) => (
          <Col className="mr-2 mt-2" style={{ display: "flex", padding: "10px", backgroundColor: "white", borderRadius: "5px", minWidth: "350px", alignItems: "center" }}>
            <Image className="mr-2" fluid width="100px" height="100px" src={item.image} alt=""></Image>
            <div>{item.title}</div>
          </Col>
        ))}
    </Row>
  );
}
