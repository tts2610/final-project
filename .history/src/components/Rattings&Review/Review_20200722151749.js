import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import { Form, Button, Image, Spinner } from "react-bootstrap";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import { postReview } from "./ReviewAPI";
export default function Review({ user, restaurantID, setInterted }) {
  const [rating, setRating] = useState();
  const [description, setDescription] = useState();
  const [showPostLoader, setShowPostLoader] = useState(false);
  //   constructor(props) {
  //     super(props);
  //     this.state = { text: "" }; // You can also pass a Quill Delta here
  //     this.handleChange = this.handleChange.bind(this);
  //   }

  //   handleChange(value) {
  //     this.setState({ text: value });
  //   }
  //   modules = {
  //     toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], ["link", "image"], ["clean"]],
  //   };

  //   formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

  const postComments = () => {
    setShowPostLoader(true);
    console.log(restaurantID, user.email, description, rating);
    async function post() {
      const review = {
        restaurant_id: restaurantID,
        email: user.email,
        description: description,
        rating: rating,
      };
      const res = await postReview(review);
      console.log(res);
      setShowPostLoader(false);
      setInterted(true);
      setRating(0);
      setDescription("");
    }
    post();
  };
  return (
    //   <>
    //     <ReactQuill theme="snow" modules={this.modules} formats={this.formats} value={this.state.text} onChange={this.handleChange} />
    //   </>
    <div className="review p-5">
      <div className="row d-flex mb-4" style={{ alignItems: "center" }}>
        <div className="profile-pic">
          <Image fluid src={user.avatar} width="60px" height="60px"></Image>
        </div>
        <div className="d-flex flex-column pl-3">
          <h4>{user.name}</h4>
        </div>
      </div>

      <div className="row">
        <Form.Group style={{ width: "100%" }} controlId="exampleForm.ControlTextarea1">
          <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" rows="5" />
        </Form.Group>
        <div style={{ display: "flex" }}>
          <div className="mr-2">Rating:</div>
          <Box className="mr-2" component="fieldset" mb={3} borderColor="transparent">
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>
          <div>
            <Button variant="success" onClick={() => postComments()}>
              Post {showPostLoader && <Spinner size="sm" animation="border" className="ml-2" variant="light" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
