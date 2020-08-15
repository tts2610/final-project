import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Container, Form, Spinner, Image } from "react-bootstrap";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

export default function Root() {
  return (
    <div className="page root-page">
      <Container>
        <div className="row">
          <div className="col-lg-8">
            <div className="findAdress-form">
              <h5>Good Evening</h5>
              <h1>Let's explore good food near you.</h1>
              <Form className="mt-4">
                <Form.Group controlId="formBasicEmail">
                  <div className="search">
                    <Search />
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Search() {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
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
    // localStorage.setItem("location", value);
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
  const onClickFind = async (value) => {
    setIsLoading(true);
    if (!coordinates.lat && !coordinates.lng) {
      navigator.geolocation.getCurrentPosition(function (position) {
        localStorage.setItem("currentLat", position.coords.latitude);
        localStorage.setItem("currentLng", position.coords.longitude);
      });
    } else {
      localStorage.setItem("currentLat", coordinates.lat);
      localStorage.setItem("currentLng", coordinates.lng);
    }

    // send to store(redux)
    setTimeout(() => {
      setCoordinates({ lat: null, lng: null });
      setIsLoading(false);
      history.push("/home");
    }, 2000);
  };

  return (
    <>
      {/* <div>Latitude: {coordinates.lat}</div>
      <div>Longitude: {coordinates.lng}</div> */}
      <Combobox className="mb-3" onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput value={value} onChange={handleChange} placeholder="Your address..." />
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <Button onClick={() => onClickFind()} className="main-btn">
        Find {isLoading && <Spinner size="sm" animation="border" variant="light" />}
      </Button>
    </>
  );
}
