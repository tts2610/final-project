import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "./style.css";
import { signUpUser } from "./SignupAPI";
import { responseFacebook, responseGoogle } from "../../AppAPI";

export default function SignupModal() {
  const showSignUp = useSelector((state) => state.showSignup);
  const dispatch = useDispatch();
  const innerRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showSignupLoader, setShowSignupLoader] = useState(false);
  const [showFBLoader, setShowFBLoader] = useState(false);

  const handleClose = () => {
    //   Clear Form
    // ....
    dispatch({ type: "SIGNUPMODAL", payload: { showSignup: false } });
  };

  const signUp = async () => {
    setShowSignupLoader(true);
    if (name && email && password) {
      const user = {
        name,
        email,
        password,
      };

      const res = await signUpUser(user);

      if (res instanceof Error) {
        setError(res.message);
      } else {
        const { token } = res.data.data;
        localStorage.setItem("token", token);
        dispatch({ type: "USERLOADED", payload: { isUserLoaded: true } });
        dispatch({ type: "SIGNUPMODAL", payload: { showSignup: false } });
      }
    } else {
      setError("Fill in all required field");
    }

    setShowSignupLoader(false);
  };

  const handleShowLogin = () => {
    dispatch({ type: "SIGNUPMODAL", payload: { showSignup: false } });
    dispatch({ type: "LOGINMODAL", payload: { showLogin: true } });
  };

  const handleFacebook = async (resp) => {
    setShowFBLoader(true);
    const user = await responseFacebook(resp);
    setShowFBLoader(false);
    if (user instanceof Error) {
      setError("Oops! Something happened");
      return;
    }

    dispatch({ type: "USERLOADED", payload: { isUserLoaded: true } });
    dispatch({ type: "SIGNUPMODAL", payload: { showSignup: false } });
  };

  const handleGoogle = async (resp) => {
    if (resp && resp.accessToken) {
      const user = await responseGoogle(resp);
      if (user instanceof Error) {
        setError("Oops! Something happened");
        return;
      }
      dispatch({ type: "USERLOADED", payload: { isUserLoaded: true } });
      dispatch({ type: "SIGNUPMODAL", payload: { showSignup: false } });
    }
  };

  useEffect(() => {
    innerRef.current && innerRef.current.focus();
  }, [showSignUp]);
  return (
    <>
      <Modal show={showSignUp} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control ref={innerRef} type="text" onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
            <Form.Control className="mt-3" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <Form.Control className="mt-3" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </Form>
          {error && <div className="mt-3 signupError">{error}</div>}
          <Button className="main-btn text-white login-btn mt-3" onClick={signUp}>
            Create account
            {showSignupLoader && <Spinner size="sm" animation="border" className="ml-2" variant="light" />}
          </Button>
          <div className="seperator-wrapper">
            <hr className="seperator-inline"></hr>
            <span className="seperator-or">or</span>
          </div>
          <div>
            <FacebookLogin
              cssClass="facebook-btn"
              autoLoad={false}
              appId="374217043555466"
              fields="name,email,picture"
              callback={(resp) => handleFacebook(resp)}
              icon={(showFBLoader && <Spinner size="sm" animation="border" className="mr-2" variant="light" />) || <i className="fab fa-facebook-f"></i>}
              textButton="&nbsp;&nbsp;Continue with Facebook"></FacebookLogin>
            <GoogleLogin clientId="823149562089-gbjb6i726ftmfln9t5gqubc88oqale9h.apps.googleusercontent.com" buttonText="Login" onSuccess={handleGoogle} onFailure={handleGoogle} cookiePolicy={"single_host_origin"} style={{}} className="google-btn">
              <span>Continue with Google</span>{" "}
            </GoogleLogin>
          </div>
        </Modal.Body>
        <Modal.Footer>
          Already have an account?{" "}
          <div className="link-signup" onClick={handleShowLogin}>
            Login
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
