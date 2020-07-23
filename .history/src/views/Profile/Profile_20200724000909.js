import React from "react";
import "./style.css";
import { useEffect } from "react";
import { fetchUser } from "../../components/Header/HeaderAPI";
import { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { updateUser, getActivities, getRestaurantList } from "./ProfileAPI";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewRestaurant from "../../components/AddNewRestaurant/AddNewRestaurant";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

export default function Profile() {
  const [user, setUser] = useState();
  const [activities, setActivities] = useState([]);
  const [myRestaurant, setMyRestaurant] = useState([]);

  useEffect(() => {
    async function getUser() {
      const user = await fetchUser();
      if (user) setUser(user.data);
      const { result } = await getActivities(user.data._id);
      setActivities(result);
      let restaurants;
      if (user) restaurants = await getRestaurantList(user.data._id);
      setMyRestaurant(restaurants);
    }

    async function getRestaurant() {}

    if (localStorage.getItem("token")) getUser();
    getRestaurant();
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
      console.log(user);
      setUser(user);
      if (user.role === "owner") {
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
                  <strong>{activities.length}</strong>Comments
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
                {activities && activities.length >= 0 ? (
                  activities.map((item) => (
                    <li>
                      <i class="activity__list__icon fa fa-question-circle-o"></i>
                      <div class="activity__list__header">
                        <img src={user.avatar} alt="" />
                        <a href="#">{user.name}</a> Posted the comment at:{" "}
                        <a style={{ color: "red" }} href={"/restaurant/" + item.name + "+" + item.res_id}>
                          {item.name}
                        </a>
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
                  ))
                ) : (
                  <Spinner style={{ margin: "0 auto" }} animation="border" variant="danger" />
                )}
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
          <div class="panel">
            <div class="panel-heading">
              <h3 class="panel-title">My restaurants</h3>
            </div>
            <div class="panel-content panel-activity">
              <ul class="panel-activity__list">
                {myRestaurant && myRestaurant.length >= 0 ? (
                  myRestaurant.map((item) => (
                    <li>
                      <i class="activity__list__icon fa fa-question-circle-o"></i>
                      <div class="activity__list__header">
                        <a style={{ color: "red" }} href={"/restaurant/" + item.name + "+" + item._id}>
                          {item.name}
                        </a>
                      </div>
                      <div class="activity__list__footer">
                        <span>
                          {" "}
                          <i class="fa fa-clock"></i>
                          {moment(`${item.createdAt}`).fromNow()}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <Spinner style={{ margin: "0 auto" }} animation="border" variant="danger" />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
