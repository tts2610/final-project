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
};

function reducer(state = initialState, action) {
  if (action.type === "LOGINMODAL") {
    state.showLogin = action.payload.showLogin;
  } else if (action.type === "SIGNUPMODAL") {
    state.showSignup = action.payload.showSignup;
  } else if (action.type === "USERLOADED") {
    state.isUserLoaded = action.payload.isUserLoaded;
  }
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
