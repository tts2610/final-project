import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "./style.css";
import { loginUser } from "./LoginAPI";
import { responseFacebook, responseGoogle } from "../../AppAPI";

export default function LoginModal() {
  const showLogin = useSelector((state) => state.showLogin);
  const dispatch = useDispatch();
  const innerRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginLoader, setshowLoginLoader] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => {
    //   Clear Form
    // ....
    setError("");
    dispatch({ type: "LOGINMODAL", payload: { showLogin: false } });
  };

  const handleShowSignup = () => {
    setError("");
    dispatch({ type: "LOGINMODAL", payload: { showLogin: false } });
    dispatch({ type: "SIGNUPMODAL", payload: { showSignup: true } });
  };

  const login = async () => {
    setshowLoginLoader(true);
    if (email && password) {
      const user = {
        email,
        password,
      };

      const res = await loginUser(user);

      if (res instanceof Error) {
        setError(res.message);
      } else {
        const { token } = res.data.data;
        localStorage.setItem("token", token);
        dispatch({ type: "USERLOADED", payload: { isUserLoaded: true } });
        dispatch({ type: "LOGINMODAL", payload: { showLogin: false } });
      }
    } else {
      setError("Fill in all required field");
    }

    setshowLoginLoader(false);
    window.location.reload();
  };

  const handleFacebook = async (resp) => {
    if (resp && resp.accessToken) {
      const user = await responseFacebook(resp);

      if (user instanceof Error) {
        setError("Oops! Something happened");
        return;
      }

      dispatch({ type: "USERLOADED", payload: { isUserLoaded: true } });
      dispatch({ type: "LOGINMODAL", payload: { showLogin: false } });
      window.location.reload();
    }
  };

  const handleGoogle = async (resp) => {
    console.log(resp);
    if (resp && resp.accessToken) {
      const user = await responseGoogle(resp);
      if (user instanceof Error) {
        setError("Oops! Something happened");
        return;
      }
      dispatch({ type: "USERLOADED", payload: { isUserLoaded: true } });
      dispatch({ type: "LOGINMODAL", payload: { showLogin: false } });
      window.location.reload();
    }
  };
  useEffect(() => {
    innerRef.current && innerRef.current.focus();
  }, [showLogin]);
  return (
    <>
      <Modal show={showLogin} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <FacebookLogin
              cssClass="facebook-btn"
              autoLoad={false}
              appId="374217043555466"
              fields="name,email,picture"
              callback={(resp) => handleFacebook(resp)}
              icon={<i className="fab fa-facebook-f"></i>}
              textButton="&nbsp;&nbsp;Continue with Facebook"
            />
            <GoogleLogin clientId="823149562089-gbjb6i726ftmfln9t5gqubc88oqale9h.apps.googleusercontent.com" buttonText="Login" onSuccess={handleGoogle} onFailure={handleGoogle} cookiePolicy={"single_host_origin"} style={{}} className="google-btn">
              <span>Continue with Google</span>{" "}
            </GoogleLogin>
          </div>
          <div className="seperator-wrapper">
            <hr className="seperator-inline"></hr>
            <span className="seperator-or">or</span>
          </div>

          <Form className="mb-3">
            {/* <span>Email:</span> */}
            <Form.Control className="mt-3" ref={innerRef} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <Form.Control className="mt-3" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </Form>

          <Button className="main-btn text-white login-btn" onClick={login}>
            Login
            {showLoginLoader && <Spinner size="sm" animation="border" className="ml-2" variant="light" />}
          </Button>
          {error && <div className="mt-3 signupError">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          New to {process.env.REACT_APP_NAME}?{" "}
          <div className="link-signup" onClick={handleShowSignup}>
            Create account
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
