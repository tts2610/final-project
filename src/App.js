import React, { Component } from "react";
import "./App.css";
import { withRouter, Switch, Route, Link } from "react-router-dom";
import FourOhFourPage from "./FourOFour";
import Home from "./Home";
import Root from "./Root";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import Footer from "./components/Footer/Footer";
import MyMap from "./components/Map/MyMap";
import RestaurantDetail from "./RestaurantDetail";

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
        <TransitionGroup component="div">
          <CSSTransition key={currentKey} timeout={timeout} classNames="pageSlider" mountOnEnter={false} unmountOnExit={true}>
            <div className={this.getPathDept(location) - this.state.prevDepth >= 0 ? "left" : "right"}>
              <Switch location={location}>
                <Route exact path="/" component={Root} />
                <Route exact path="/index" component={Home} />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
        <Switch>
          <Route exact path="/404" component={FourOhFourPage} />
          <Route exact path="/my-map" component={MyMap} />
          <Route exact path="/restaurant/:res" component={RestaurantDetail} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
