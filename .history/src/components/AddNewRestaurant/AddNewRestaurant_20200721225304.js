import React from "react";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TagInput } from "reactjs-tag-input";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import CheckboxGroup from "react-checkbox-group";
import { useEffect } from "react";
import { getTags } from "./AddNewRestaurantAPI";
import { ToastContainer, toast } from "react-toastify";

export default function AddNewRestaurant() {
  const [tags, setTags] = useState([]);

  const [inputList, setInputList] = useState([
    { title: "", image: "" },
    { title: "", image: "" },
    { title: "", image: "" },
  ]);

  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [introduction, setIntroduction] = useState("");
  const [selectedTags, setselectedTags] = useState([]);

  const [restaurantLatitude, setRestaurantLatitude] = useState("");
  const [restaurantLongitude, setRestaurantLongitude] = useState("");

  const setCoordinates = (latLng) => {
    console.log(latLng);
    const { lat, lng } = latLng;
    setRestaurantLatitude(lat);
    setRestaurantLongitude(lng);
  };

  const setAddress = (address) => {
    console.log(address);
    setRestaurantAddress(address);
  };

  const handleInputChange = (e, index) => {
    const { name, value, files } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    if (files) {
      for (const key of Object.keys(files)) {
        console.log(files[key]);
        list[index]["image"] = files[key];
      }
      //   list[index][name] = files;
    }
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const insertRestaurant = () => {
    let filterList = [];
    for (let index = 0; index < inputList.length; index++) {
      const { title, image } = inputList[index];
      if (!title || !image) continue;
      else {
        filterList.push(inputList[index]);
      }
    }
    console.log(!restaurantName, !restaurantAddress, !phoneNumber, !introduction, selectedTags.length === 0, !restaurantLatitude, !restaurantLongitude, filterList.length === 0);
    if (!restaurantName || !restaurantAddress || !phoneNumber || !introduction || selectedTags.length === 0 || !restaurantLatitude || !restaurantLongitude || filterList.length === 0) {
      toast.error("Please input required fields");
    }
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { title: "", image: "" }]);
  };

  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], ["link", "image"], ["clean"]],
  };

  const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

  const handleChange = (value) => {
    setIntroduction(value);
  };

  useEffect(() => {
    async function getAllTags() {
      const tags = await getTags();
      console.log(tags);
      setTags(tags.tagList);
    }
    getAllTags();
  }, []);

  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };
  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div>
          <Form autoComplete="off">
            <Form.Group controlId="formBasicPassword">
              <Form.Control value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} type="text" placeholder="Restaurant name" />
            </Form.Group>

            <Search setCoordinates={setCoordinates} setAddress={setAddress} />

            <Form.Group controlId="formBasicPassword">
              <Form.Control value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="number" placeholder="Phone number" />
            </Form.Group>

            <ReactQuill theme="snow" modules={modules} formats={formats} value={introduction} onChange={handleChange} />
            {/* <TagInput tags={tags} onTagsChanged={onTagsChanged} /> */}
            {/* <div className="mt-4" style={{ border: "1px solid grey", width: "50%", padding: "10px", height: "150px", overflowY: "scoll" }}>
            <Form.Check label="1" type="checkbox" />
            <Form.Check label="2" type="checkbox" />
          </div> */}
            <div className="mt-4" style={{ border: "1px solid #cccccc", width: "50%", padding: "10px", height: "150px", overflowY: "scoll", display: "flex", flexDirection: "column", overflowY: "scroll" }}>
              <CheckboxGroup name="fruits" value={selectedTags} onChange={setselectedTags}>
                {(Checkbox) => (
                  <>
                    {tags.map((item, indx) => (
                      <label key={indx}>
                        <Checkbox value={item} /> {item}
                      </label>
                    ))}
                  </>
                )}
              </CheckboxGroup>
            </div>

            <Form.Group>
              <Form.File id="exampleFormControlFile1" label="" />
            </Form.Group>
            <Button variant="primary" onClick={handleClick}>
              Click to add menus
            </Button>
          </Form>
        </div>
        <div>
          {inputList.map((x, i) => {
            return (
              <div className="box">
                <input name="title" placeholder="Enter Food Title" value={x.title} onChange={(e) => handleInputChange(e, i)} />
                <input type="file" className="ml-3" name="image" onChange={(e) => handleInputChange(e, i)} />
                <div className="btn-box">
                  {inputList.length !== 1 && (
                    <Button className="my-3 mr-2" variant="danger" onClick={() => handleRemoveClick(i)}>
                      Remove
                    </Button>
                  )}
                  {inputList.length - 1 === i && (
                    <Button className="my-3" variant="warning" onClick={handleAddClick}>
                      Add
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
          <Button className="mt-5" variant="primary" onClick={handleClick}>
            Back
          </Button>
          <Button className="mt-5 ml-3" variant="success" onClick={insertRestaurant}>
            Add new!
          </Button>
        </div>
      </ReactCardFlip>
      <ToastContainer />
    </>
  );
}

function Search({ setCoordinates, setAddress }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const handleSelect = async (value) => {
    setValue(value, false);
    setAddress(value);
    const parameter = {
      address: value,
    };
    getGeocode(parameter)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setCoordinates(latLng));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setAddress(e.target.value);
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
      <Combobox className="mb-3" onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput style={{ width: "100%", border: "1px solid #ced4da", padding: "5px", borderRadius: "2px" }} value={value} onChange={handleChange} placeholder=" Restaurant address..." />
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </>
  );
}
