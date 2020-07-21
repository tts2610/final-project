import React from "react";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddNewRestaurant() {
  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], ["link", "image"], ["clean"]],
  };

  const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

  const handleChange = (value) => {
    this.setState({ text: value });
  };
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div>
        <Form autoComplete="off">
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Password" />
          </Form.Group>

          <Search />

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="number" placeholder="Phone number" />
          </Form.Group>

          <ReactQuill theme="snow" modules={this.modules} formats={this.formats} value={this.state.text} onChange={this.handleChange} />

          <Button variant="primary" type="submit" onClick={handleClick}>
            Click to flip
          </Button>
        </Form>
      </div>
      <div>
        This is the back of the card.
        <button onClick={handleClick}>Click to flip</button>
      </div>
    </ReactCardFlip>
  );
}

function Search() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();
  const [coordinates, setCoordinates] = useState({
    lat: "",
    lng: "",
  });

  const handleSelect = async (value) => {
    setValue(value, false);
    localStorage.setItem("location", value);
    const parameter = {
      address: value,
    };
    getGeocode(parameter)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setCoordinates(latLng));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  //   const onClickFind = async (value) => {
  //     setIsLoading(true);
  //     localStorage.setItem("currentLat", coordinates.lat);
  //     localStorage.setItem("currentLng", coordinates.lng);
  //     // send to store(redux)
  //     setTimeout(() => {
  //       setCoordinates({ lat: null, lng: null });
  //       setIsLoading(false);
  //       history.push("/home");
  //     }, 2000);
  //   };

  return (
    <>
      <div>Latitude: {coordinates.lat}</div>
      <div>Longitude: {coordinates.lng}</div>
      <Combobox className="mb-3" onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput style={{ width: "100%", border: "1px solid #ced4da", padding: "5px", borderRadius: "2px" }} value={value} onChange={handleChange} placeholder="Your address..." />
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </>
  );
}
