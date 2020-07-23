import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";

const initialState = {
  showLogin: false,
  showSignup: false,
  isUserLoaded: false,
  searchParams: { tags: [], page: 1, perPage: undefined, totalPage: 0 },
  reviewsParams: { page: 1 },
  myRestaurantParams: { page: 1 },
};

function reducer(state = initialState, action) {
  if (action.type === "LOGINMODAL") {
    state.showLogin = action.payload.showLogin;
  } else if (action.type === "SIGNUPMODAL") {
    state.showSignup = action.payload.showSignup;
  } else if (action.type === "USERLOADED") {
    state.isUserLoaded = action.payload.isUserLoaded;
  } else if (action.type === "FILTER") {
    let newParams = { ...state.searchParams };
    for (const [key, value] of Object.entries(action.payload.searchParams)) {
      newParams[key] = value;
    }

    state.searchParams = { ...newParams };
  } else if (action.type === "REVIEWS") {
    let newParams = { ...state.reviewsParams };
    for (const [key, value] of Object.entries(action.payload.reviewsParams)) {
      newParams[key] = value;
    }
    state.reviewsParams = { ...newParams };
  } else if (action.type === "MYRESTAURANT") {
    let newParams = { ...state.myRestaurantParams };
    for (const [key, value] of Object.entries(action.payload.myRestaurantParams)) {
      newParams[key] = value;
    }
    state.myRestaurantParams = { ...newParams };
  }

  console.log(state.myRestaurantParams);
  state = { ...state };
  return state;
}
const store = createStore(
  reducer,
  // Hooks up Redux Devtools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
