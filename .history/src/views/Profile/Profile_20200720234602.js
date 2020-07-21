import React from "react";
import "./style.css";
import { useEffect } from "react";
import { fetchUser } from "../../components/Header/HeaderAPI";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { updateUser } from "./ProfileAPI";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
export default function Profile() {
  const [user, setUser] = useState();
  const [images, setImages] = useState("");
  useEffect(() => {
    async function getUser() {
      const user = await fetchUser();
      if (user) setUser(user.data);
    }
    if (localStorage.getItem("token")) getUser();
  }, []);

  const handleChange = async (files) => {
    if (files) {
      var formData = new FormData();
      for (const key of Object.keys(files)) {
        formData.append("avatar", files[key]);
      }
      const user = await updateUser(localStorage.getItem("token"), formData);
      setUser(user);
    }
  };
  async function handleToken(token, addresses) {
    // const response = await axios.post("https://ry7v05l6on.sse.codesandbox.io/checkout", { token, product });
    // const { status } = response.data;
    // console.log("Response:", response.data);
    // if (status === "success") {
    //   toast("Success! Check email for details", { type: "success" });
    // } else {
    //   toast("Something went wrong", { type: "error" });
    // }
  }

  if (!user) return <></>;
  return (
    <div>
      {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"> */}
      <div class="container">
        <div class="col-lg-8" style={{ display: "contents" }}>
          <div class="panel profile-cover">
            <div class="profile-cover__img">
              <label htmlFor="upload-button">
                <img style={{ cursor: "pointer" }} src={!user.avatar ? `https://image.freepik.com/free-icon/upload-document_318-8461.jpg` : user.avatar} alt=""></img>
              </label>
              <input type="file" id="upload-button" style={{ display: "none" }} onChange={(e) => handleChange(e.target.files)} />
              <h3 class="h3">{user.name}</h3>
            </div>
            <div class="profile-cover__action bg--img" data-overlay="0.3">
              <button class="btn btn-rounded" style={{ backgroundColor: "transparent" }}></button>
              <button class="btn btn-rounded" style={{ backgroundColor: "transparent" }}></button>
            </div>
            <div class="profile-cover__info">
              <ul class="nav">
                <li>
                  <strong>26</strong>Comments
                </li>
                <li>
                  <strong>33</strong>Likes
                </li>
              </ul>
            </div>
          </div>
          <div class="panel">
            <div class="panel-heading">
              <h3 class="panel-title">Activity Feed</h3>
            </div>
            <div class="panel-content panel-activity">
              <ul class="panel-activity__list">
                <li>
                  <i class="activity__list__icon fa fa-question-circle-o"></i>
                  <div class="activity__list__header">
                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
                    <a href="#">John Doe</a> Posted the question: <a href="#">How can I change my annual reports for the better effect?</a>
                  </div>
                  <div class="activity__list__body entry-content">
                    <p>
                      <strong>Lorem ipsum dolor sit amet</strong>, consectetur adipisicing elit. Voluptatibus ab a nostrum repudiandae dolorem ut quaerat veniam asperiores, rerum voluptatem magni dolores corporis!
                      <em>Molestiae commodi nesciunt a, repudiandae repellendus ea.</em>
                    </p>
                  </div>
                  <div class="activity__list__footer">
                    <a href="#">
                      {" "}
                      <i class="fa fa-thumbs-up"></i>123
                    </a>
                    <a href="#">
                      {" "}
                      <i class="fa fa-comments"></i>23
                    </a>
                    <span>
                      {" "}
                      <i class="fa fa-clock"></i>2 hours ago
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="panel">
            <div class="panel-heading">
              <h3 class="panel-title">Upgrade to restaurant's owner!</h3>
            </div>
            <div class="panel-content panel-activity">
              <StripeCheckout stripeKey="pk_test_51H71vcC8ES7aOI0iJD8mbtmMJPpWKUR7HoqSjkLbSnd4CHskWbjYQACmUtCwfzsYn89vQZu9OoG7g38Me3yPW5uL00ZPuuCbyh" token={handleToken} name="Become an owner!" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
