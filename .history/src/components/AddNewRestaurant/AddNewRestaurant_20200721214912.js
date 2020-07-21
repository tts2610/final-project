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

export default function AddNewRestaurant() {
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setselectedTags] = useState([]);
  const [inputList, setInputList] = useState([{ title: "", image: "" }]);

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

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { title: "", image: "" }]);
  };

  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], ["link", "image"], ["clean"]],
  };

  const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

  const handleChange = (value) => {
    setText(value);
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
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div>
        <Form autoComplete="off">
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Restaurant name" />
          </Form.Group>

          <Search />

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="number" placeholder="Phone number" />
          </Form.Group>

          <ReactQuill theme="snow" modules={modules} formats={formats} value={text} onChange={handleChange} />
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
            Click to flip
          </Button>
        </Form>
      </div>
      <div>
        {inputList.map((x, i) => {
          return (
            <div className="box">
              <input name="title" placeholder="Enter Food Title" value={x.title} onChange={(e) => handleInputChange(e, i)} />
              <input type="file" className="ml10" name="image" onChange={(e) => handleInputChange(e, i)} />
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <button className="mr10" onClick={() => handleRemoveClick(i)}>
                    Remove
                  </button>
                )}
                {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
              </div>
            </div>
          );
        })}
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
      <Combobox className="mb-3" onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput style={{ width: "100%", border: "1px solid #ced4da", padding: "5px", borderRadius: "2px" }} value={value} onChange={handleChange} placeholder=" Restaurant address..." />
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </>
  );
}
