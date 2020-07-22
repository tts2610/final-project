import React from "react";
import "./style.css";
import { useEffect } from "react";
import { fetchUser } from "../../components/Header/HeaderAPI";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { updateUser, getActivities } from "./ProfileAPI";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewRestaurant from "../../components/AddNewRestaurant/AddNewRestaurant";
import moment from "moment";
export default function Profile() {
  const [user, setUser] = useState();
  const [images, setImages] = useState("");
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    async function getUser() {
      const user = await fetchUser();
      if (user) setUser(user.data);
      const activities = await getActivities(user.data._id);
      setActivities(activities);
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
    if (user) {
      var formData = new FormData();
      formData.append("verified", true);
      formData.append("role", "owner");
      const user = await updateUser(localStorage.getItem("token"), formData);
      setUser(user);
      if (user.verified) {
        toast("Success! Star by posting your first restaurant!", { type: "success" });
      } else {
        toast("Something went wrong", { type: "error" });
      }
    }
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
                {activities &&
                  activities.map((item) => (
                    <li>
                      <i class="activity__list__icon fa fa-question-circle-o"></i>
                      <div class="activity__list__header">
                        <img src={user.avatar} alt="" />
                        <a href="#">{user.name}</a> Posted the comment at: <a href={"/restaurant/" + item.name + "+" + item.res_id}>{item.name}</a>
                      </div>
                      <div class="activity__list__body entry-content">
                        <p>{item.desc}</p>
                      </div>
                      <div class="activity__list__footer">
                        <span>
                          {" "}
                          <i class="fa fa-clock"></i>
                          {moment(`${item.createdAt}`).fromNow()}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          {user.role !== "owner" && (
            <div class="panel">
              <div class="panel-heading">
                <h3 class="panel-title">Upgrade to restaurant's owner!</h3>
              </div>
              <div class="panel-content panel-activity">
                <StripeCheckout stripeKey="pk_test_51H71vcC8ES7aOI0iJD8mbtmMJPpWKUR7HoqSjkLbSnd4CHskWbjYQACmUtCwfzsYn89vQZu9OoG7g38Me3yPW5uL00ZPuuCbyh" token={handleToken} name="Become an owner!" billingAddress />
              </div>
            </div>
          )}
          {user.role === "owner" && (
            <div class="panel">
              <div class="panel-heading">
                <h3 class="panel-title">Host new restaurant!</h3>
              </div>
              <div class="panel-content panel-activity">
                <AddNewRestaurant />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
