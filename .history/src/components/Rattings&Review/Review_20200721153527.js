import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import { Form, Button } from "react-bootstrap";
export default function Review({ restaurantID }) {
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

  return (
    //   <>
    //     <ReactQuill theme="snow" modules={this.modules} formats={this.formats} value={this.state.text} onChange={this.handleChange} />
    //   </>
    <div className="review p-5">
      <div className="row d-flex">
        <div className="profile-pic">
          <img src="" width="60px" height="60px"></img>
        </div>
        <div className="d-flex flex-column pl-3">
          <h4>Sean</h4>
        </div>
      </div>

      <div className="row pb-3">
        <Form.Group style={{ width: "100%" }} controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows="5" />
        </Form.Group>
        <Button variant="success">Post</Button>
      </div>
    </div>
  );
}
