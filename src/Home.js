import React from "react";
import "./App.css";
// import MyMap from "./components/MyMap";
import FoodCard from "./components/FoodCard/FoodCard";
import { CardDeck, Container, Button } from "react-bootstrap";
import parse from "html-react-parser";
// import axios from "axios";
import Header from "./components/Header/Header";
import LoginModal from "./components/LoginModal/LoginModal";
import SignupModal from "./components/SignupModal/SignupModal";
import { Link } from "react-router-dom";
import Footer from "./components/Footer/Footer";

export default function Home() {
  // state = {
  //   desc: "<h1>sdcsDC</h1>",
  // };
  // const [desc, setDesc] = useState("");

  // useEffect(() => {
  //   // axios.get(`https://foody-clone.herokuapp.com/restaurants`).then((res) => {
  //   //   const persons = res.data;
  //   //   setDesc(persons);
  //   // });
  // }, []);

  return (
    <div className="page">
      <Header />
      <Container className="mt-2">
        {/* <div>{parse(`${desc}`)}</div> */}
        {/* <MyMap></MyMap> */}

        <CardDeck>
          <FoodCard></FoodCard>
          <FoodCard></FoodCard>
          <FoodCard></FoodCard>
        </CardDeck>

        {/* <Link to="/root">
          <Button>Root</Button>
        </Link> */}
      </Container>
      <Footer />

      <LoginModal />
      <SignupModal />
    </div>
  );
}
