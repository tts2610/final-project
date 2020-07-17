import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import Rheostat from "rheostat";
import { useDispatch } from "react-redux";
import axios from "axios";

const languageConvert = {
  Vietnameses: "vi",
  Korean: "ko",
  English: "en",
};
let tempData;
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default function Filters() {
  const [tags, setTags] = useState([]);
  const [selectedOption, setSelected] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  // const [data, setData] = useState([]);

  const dispatch = useDispatch();
  // const getLanguageList = (data) => {
  //   let arr = new Set();
  //   for (let index = 0; index < data.length; index++) {
  //     const element = data[index];
  //     element.languages.forEach((item) => arr.add(getKeyByValue(languageConvert, item)));
  //   }
  //   let newLangList = Array.from(arr).reduce((acc, item, indx) => {
  //     let obj = { name: item, id: indx };
  //     acc.push(obj);
  //     return acc;
  //   }, []);
  //   setLanguages(newLangList);
  // };

  const getTagList = (data) => {
    let arr = new Set();
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      element.tags.forEach((item) => arr.add(item.title));
    }

    let newTagList = Array.from(arr).reduce((acc, item, indx) => {
      let obj = { name: item, id: indx };
      acc.push(obj);
      return acc;
    }, []);

    setTags(newTagList);
  };
  useEffect(() => {
    if (!tempData)
      axios
        .get(`${process.env.REACT_APP_API_URL}/restaurants`)
        .then(function (res) {
          tempData = res.data.data.restaurantList;
        })
        .then(function (res) {
          // getLanguageList(tempData);
          getTagList(tempData);
        });
    if (selectedOption.length === 0 && selectedTags.length === 0) {
      dispatch({ type: "FILTER", payload: { searchParams: { tags: [], page: 1, perPage: 8, totalPage: 0 }, isFiltering: false } });
    }
  }, [selectedOption, selectedTags, dispatch]);

  // const handleSelectLanguage = (selectedList) => {
  //   setSelected(selectedList);
  //   dispatch({ type: "FILTER", payload: { searchParams: { languages: selectedList.map((e) => languageConvert[e.name]), perPage: undefined }, isFiltering: true } });
  //   // filterByLanguage();
  // };

  // const handleRemoveLanguage = (selectedList) => {
  //   setSelected(selectedList);
  //   dispatch({ type: "FILTER", payload: { searchParams: { languages: selectedList.map((e) => languageConvert[e.name]), perPage: undefined }, isFiltering: true } });
  //   // filterByLanguage();
  // };

  const handleSelectTag = (selectedList) => {
    setSelectedTags(selectedList);
    console.log(selectedList);
    dispatch({ type: "FILTER", payload: { searchParams: { tags: selectedList.map((e) => e.name), perPage: undefined }, isFiltering: true } });
    // filterByLanguage();
  };

  const handleRemoveTag = (selectedList) => {
    setSelectedTags(selectedList);
    dispatch({ type: "FILTER", payload: { searchParams: { tags: selectedList.map((e) => e.name), perPage: undefined }, isFiltering: true } });
    // filterByLanguage();
  };

  // const handleChange = (e) => {
  //   setMinPrice(e.values[0]);
  //   setMaxPrice(e.values[1]);
  //   dispatch({ type: "FILTER", payload: { searchParams: { minPrice: e.values[0], maxPrice: e.values[1], perPage: undefined }, isFiltering: true } });
  // };

  const handleReset = () => {
    setSelected([]);
    setSelectedTags([]);
    dispatch({ type: "FILTER", payload: { searchParams: { tags: [], page: 1, averageRating: undefined, perPage: 8, totalPage: 0 }, isFiltering: false } });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Multiselect
        options={tags}
        selectedValues={selectedTags}
        onSelect={handleSelectTag}
        onRemove={handleRemoveTag}
        displayValue="name"
        showCheckbox={true}
        placeholder="Filter by tags"
        closeOnSelect={false}
        avoidHighlightFirstOption={true}
        closeIcon="close"
      />
      <Button className="success mt-3" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
}
