import React, { useEffect, useState } from "react";
import "./style.css";
import { getReivewByRestaurantID } from "./RatingAPI";
import Review from "./Review";
import moment from "moment";
import { fetchUser } from "../Header/HeaderAPI";
import { ToastContainer, toast } from "react-toastify";

export default function Rating({ restaurant }) {
  const [review, setReview] = useState([]);
  const ref = React.createRef();
  const [user, setUser] = useState();

  // const [rating, setrating] = useState(initialState);

  const getReviews = (rating) => {
    let dot;
    let ratings = [];
    if (rating < 3) {
      dot = "red-dot";
    } else if (rating >= 3 && rating < 5) {
      dot = "yellow-dot";
    } else {
      dot = "green-dot";
    }
    for (let index = 0; index < rating; index++) {
      ratings.push(<div className={`fa fa-circle ${dot} my-auto rating-dot`}></div>);
    }

    if (dot == "red-dot") {
      ratings.push(
        <div className="red-text">
          <h5 className="mb-0 pl-3">Bad</h5>
        </div>
      );
    } else if (dot == "yellow-dot") {
      ratings.push(
        <div className="yellow-text">
          <h5 className="mb-0 pl-3">OK</h5>
        </div>
      );
    } else {
      ratings.push(
        <div className="green-text">
          <h5 className="mb-0 pl-3">Excellent</h5>
        </div>
      );
    }

    return ratings;
  };

  const writeReview = () => {
    if (!user) {
      toast.error("You must login to continue!");
      return;
    }
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    async function getReview() {
      const reviews = await getReivewByRestaurantID(restaurant._id);
      console.log(reviews);
      setReview(reviews.reviewList);
    }
    getReview();
  }, []);
  useEffect(() => {
    async function getUser() {
      const user = await fetchUser();
      if (user) setUser(user.data);
    }
    if (localStorage.getItem("token")) getUser();
  }, []);
  return (
    <div>
      <div className="container-fluid px-0 py-5 mx-auto">
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-12" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <div className="card border-0 px-3">
              <div className="d-flex row py-5 px-5 bg-light">
                <div className="green-tab p-2 px-3 mx-2">
                  <p className="sm-text mb-0">OVERALL RATING</p>
                  <h4>{Math.round(restaurant.averageRating * 10) / 10}</h4>
                </div>
                <div className="white-tab p-2 mx-2 text-muted">
                  <p className="sm-text mb-0">ALL REVIEWS</p>
                  <h4>{review.length}</h4>
                </div>
                <div className="white-tab p-2 mx-2">
                  <p className="sm-text mb-0 text-muted">POSITIVE REVIEWS</p>
                  <h4 className="green-text">93%</h4>
                </div>
                <div className="ml-md-auto p-2 mx-md-2 pt-4 pt-md-3">
                  {" "}
                  <button className="btn btn-red px-4" onClick={() => writeReview()}>
                    WRITE A REVIEW
                  </button>{" "}
                </div>
              </div>
              <div className="row bg-light">
                <div className="col-md-2 col-4 text-center block py-5">
                  <div className="round-icon">
                    {" "}
                    <img src="https://i.imgur.com/8lJt6UN.png" width="50px" height="50px"></img>{" "}
                  </div>
                  <p className="sm-text-1 grey-text mb-0">100</p>
                  <div className="fa fa-circle green-dot"></div>
                  <div className="fa fa-circle green-dot"></div>
                  <div className="fa fa-circle green-dot"></div>
                  <div className="fa fa-circle green-dot"></div>
                  <div className="fa fa-circle green-dot"></div>
                </div>
                <div className="col-md-2 col-4 text-center block py-5">
                  <div className="round-icon">
                    {" "}
                    <img src="https://i.imgur.com/Grjnbah.png" width="50px" height="50px"></img>{" "}
                  </div>
                  <p className="sm-text-1 grey-text mb-0">100</p>
                  <div className="fa fa-circle red-dot"></div>
                  <div className="fa fa-circle red-dot"></div>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                </div>
                <div className="col-md-2 col-4 text-center block py-5">
                  <div className="round-icon">
                    {" "}
                    <img src="https://i.imgur.com/q2v8mqu.png" width="50px" height="50px"></img>{" "}
                  </div>
                  <p className="sm-text-1 grey-text mb-0">100</p>
                  <div className="fa fa-circle yellow-dot"></div>
                  <div className="fa fa-circle yellow-dot"></div>
                  <div className="fa fa-circle yellow-dot"></div>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                </div>
                <div className="col-md-2 col-4 text-center block py-5">
                  <div className="round-icon">
                    {" "}
                    <img src="https://i.imgur.com/EkmVVM1.png" width="50px" height="50px"></img>{" "}
                  </div>
                  <p className="sm-text-1 grey-text mb-0">100</p>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                </div>
                <div className="col-md-2 col-4 text-center block py-5">
                  <div className="round-icon">
                    {" "}
                    <img src="https://i.imgur.com/ZbZzavI.png" width="50px" height="50px"></img>{" "}
                  </div>
                  <p className="sm-text-1 grey-text mb-0">100</p>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                </div>
                <div className="col-md-2 col-4 text-center block py-5">
                  <div className="round-icon">
                    {" "}
                    <img src="https://i.imgur.com/S6SGKFQ.png" width="50px" height="50px"></img>{" "}
                  </div>
                  <p className="sm-text-1 grey-text mb-0">100</p>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                  <div className="fa fa-circle"></div>
                </div>
              </div>

              {review.map((review) => (
                <div className="review p-5">
                  <div className="row d-flex">
                    <div className="profile-pic">
                      <img src={review.user_id.avatar} width="60px" height="60px"></img>
                    </div>
                    <div className="d-flex flex-column pl-3">
                      <h4>{review.user_id.name}</h4>
                      <p className="grey-text">{moment(`${review.createdAt}`).fromNow()}</p>
                    </div>
                  </div>
                  <div className="row pb-3">{getReviews(review.rating)}</div>
                  <div className="row pb-3">
                    <p>{review.description}</p>
                  </div>
                  <div className="row ml-1">
                    <div className="row bg-light via">
                      <div className="px-2">
                        <img src="https://i.imgur.com/8lJt6UN.png" width="18px" height="18px"></img>
                      </div>
                      <p className="grey-text mb-0 px-3">via Google</p>
                    </div>
                  </div>
                </div>
              ))}
              {user && <Review />}
              <div ref={ref}></div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
