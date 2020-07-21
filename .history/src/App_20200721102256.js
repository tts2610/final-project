import React, { Component } from "react";
import "./App.css";
import { withRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import FourOhFourPage from "./FourOFour";
import Home from "./Home";
import Root from "./Root";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import Footer from "./components/Footer/Footer";
import MyMap from "./components/Map/MyMap";
import RestaurantDetail from "./RestaurantDetail";
import LoginModal from "./components/LoginModal/LoginModal";
import SignupModal from "./components/SignupModal/SignupModal";
import Profile from "./views/Profile/Profile";
import { fetchUser } from "./components/Header/HeaderAPI";

// const ProtectedRoute = async ({ component: Component, ...rest }) => {
//   const user = await fetchUser();
//   const isOwner = user.role === "owner";
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         console.log("bbbb");
//         if (isOwner || user) {
//           return <Component {...rest} {...props} />;
//         } else {
//           return <Redirect to="/404" />;
//         }
//       }}
//     />
//   );
// };

const ProtectedRoute = ({ component: Component, ...rest }) => {
  
  const getUser = async (){
    const user = await fetchUser();
  }
  getUser();
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.data) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/404" />;
        }
      }}
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevDepth: this.getPathDept(this.props.location),
    };
  }

  componentWillReceiveProps() {
    this.setState({ prevDepth: this.getPathDept(this.props.location) });
  }

  getPathDept(location) {
    let pathArr = location.pathname.split("/");
    pathArr = pathArr.filter((n) => n !== "");
    return pathArr.length;
  }

  render() {
    const { location } = this.props;
    const timeout = { enter: 1000, exit: 400 };
    const currentKey = location.pathname.split("/")[1] || "/";
    return (
      <div>
        {/* <TransitionGroup component="div">
          <CSSTransition key={currentKey} timeout={timeout} classNames="pageSlider" mountOnEnter={false} unmountOnExit={true}>
            <div className={this.getPathDept(location) - this.state.prevDepth >= 0 ? "left" : "right"}> */}
        <Switch location={location}>
          <Route exact path="/home" component={Home} />
          <Route exact path="/404" component={FourOhFourPage} />
          {/* <Route exact path="/my-map" component={MyMap} /> */}
          <Route exact path="/restaurant/:res" component={RestaurantDetail} />
          <Route exact path="/" component={Root} />
          <ProtectedRoute path="/myProfile" component={Profile} />
        </Switch>
        {/* </div>
          </CSSTransition>
        </TransitionGroup> */}
        <Switch></Switch>
        <LoginModal />
        <SignupModal />
      </div>
    );
  }
}

export default withRouter(App);
