import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, signOut } from "./HeaderAPI";
import { NavDropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const isUserLoaded = useSelector((state) => state.isUserLoaded);
  const [user, setUser] = useState();

  const handleShowLogin = () => {
    dispatch({ type: "LOGINMODAL", payload: { showLogin: true } });
  };
  const handleShowSignUp = () => {
    dispatch({ type: "SIGNUPMODAL", payload: { showSignup: true } });
  };

  const signOutUser = async () => {
    const res = await signOut();
    if (!(res instanceof Error)) {
      localStorage.removeItem("token");
      setUser(null);
      window.location.reload();
    }
  };

  useEffect(() => {
    async function getUser() {
      const user = await fetchUser();
      if (user) setUser(user.data);
    }
    if (localStorage.getItem("token")) getUser();
  }, [isUserLoaded]);
  return (
    <div>
      <header className="masthead text-white ">
        <div className="container header-top" style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <a style={{ textDecoration: "none", color: "white" }} href="/home">
              <h5>Home</h5>
            </a>
            |
            <a className="ml-3" style={{ textDecoration: "none", color: "white" }} href="/">
              <h5>Search</h5>
            </a>
          </div>

          {user ? (
            <div>
              <NavDropdown title={user.email} id="basic-nav-dropdown">
                <NavDropdown.Item href="/myProfile">User Info</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={() => signOutUser()}>
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <div onClick={handleShowLogin}>Login</div>
              <div className="ml-3" onClick={handleShowSignUp}>
                Signup
              </div>
            </div>
          )}
        </div>

        <div className="overlay"></div>
        <div className="container text-center header-body">
          <div className="row">
            <div className="col-xl-9 ml-5">
              {/* <h1 className="mb-5 text-white">Discover the best food & drinks in Vietnam</h1> */}
              <Image src="banner_1.png" width="1000"></Image>
            </div>
            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
              <form>
                <div className="form-row">
                  <div className="col-12 col-md-9 mb-2 mb-md-0">
                    <input type="email" className="form-control form-control-lg" placeholder="Enter your email..."></input>
                  </div>
                  <div className="col-12 col-md-3">
                    <button type="submit" className="btn btn-block btn-lg main-btn text-white">
                      Sign up!
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
