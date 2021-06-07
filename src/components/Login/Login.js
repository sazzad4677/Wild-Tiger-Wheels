import React, { useContext, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebaseConfig/firebaseConfig.config";
import { userContext } from "../../App";

// handel error with firebase initialization conflict
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const Login = () => {
  const [loggedIn, setLoggedIn] = useContext(userContext);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  //Choose which component will appear when a new user logs in.
  const [newUser, setNewUser] = useState(false);

  //handel login form
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  //match password
  const [error, setError] = useState("");

  //update the state using form data
  const updateUserInfo = (e) => {
    const newUserInfo = { ...user };
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
    if (user.password !== user.confirmPassword) {
      setError("Password Not Matched");
    } else {
      setError("");
    }
  };

  //Sign In or Sign up with email
  const handelSubmit = (e) => {
    e.preventDefault();
    // Sign Up with Email
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const createdUser = { ...user };
          createdUser.isLoggedIn = true;
          createdUser.email = res.email;
          setUser(createdUser);
          setLoggedIn(createdUser);
          updateUserName(user.name);
          history.replace(from); 
        })
        .catch((error) => {
          const createdUser = { ...user };
          createdUser.isLoggedIn = false;
          createdUser.error = error.message;
          setUser(createdUser);
          setLoggedIn(createdUser);
        });
    }
    //Sign In With Email
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const loginUser = { ...user };
          loginUser.name=res.user.displayName;
          loginUser.isLoggedIn = true;
          loginUser.error = "";
          setUser(loginUser);
          setLoggedIn(loginUser);
          history.replace(from);
        })
        .catch((error) => {
          const loginUser = { ...user };
          loginUser.isLoggedIn = false;
          loginUser.error = error.message;
          setUser(loginUser);
          setLoggedIn(loginUser);
        });
    }
  };

  //Sign in with google account
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const googleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const createdUser = { ...user };
        createdUser.isLoggedIn = true;
        createdUser.name = result.user.displayName;
        setUser(createdUser);
        setLoggedIn(createdUser);
        updateUserName(result.user.displayName);
        history.replace(from);
      })
      .catch((error) => {
        const createdUser = { ...user };
        createdUser.isLoggedIn = false;
        createdUser.error = error.message;
        setUser(createdUser);
        setLoggedIn(createdUser);
      });
  };

  //sign in with Facebook
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const fbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const createdUser = { ...user };
        createdUser.isLoggedIn = true;
        createdUser.name = result.user.displayName;
        setUser(createdUser);
        setLoggedIn(createdUser);
        updateUserName(result.user.displayName);
        history.replace(from);
      })
      .catch((error) => {
        const createdUser = { ...user };
        createdUser.isLoggedIn = false;
        createdUser.error = error.message;
        setUser(createdUser);
        setLoggedIn(createdUser);
      });
  };

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName:  name ,
      })
  };

  return (
    <div>
      {/* Navigation Bar */}
      <Header user={user}></Header>
      {/* Login or Create account form */}
      <Container className="login d-flex justify-content-center mt-5">
        {/* Email */}
        <Form onSubmit={handelSubmit} className="login-form col-md-7">
          {/*  Create Account Label */}
          {newUser && (
            <Form.Label className="login-label mt-3 ml-3 ">
              Create an Account
            </Form.Label>
          )}
          {/* Login Account Label */}
          {!newUser && (
            <Form.Label className="login-label mt-3 ml-3 ">Login</Form.Label>
          )}
          {/* Name for Registration */}
          {newUser && (
            <Form.Group className="mt-4 ml-3 mr-3">
              <Form.Control
                name="name"
                type="text"
                placeholder="Name"
                className="text-field"
                // pattern="^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$"
                onBlur={updateUserInfo}
                required
              />
            </Form.Group>
          )}
          {/* Email Account */}
          <Form.Group controlId="formBasicEmail" className="mt-4 ml-3 mr-3">
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              className="text-field"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              //   title="Please enter a valid email address"
              onBlur={updateUserInfo}
            />
          </Form.Group>
          {/* Password */}
          <Form.Group className="mt-4 ml-3 mr-3">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              className="text-field"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
              onChange={updateUserInfo}
            />
          </Form.Group>

          {/* Confirm Password */}
          {newUser && (
            <Form.Group className="mt-4 ml-3 mr-3">
              <Form.Control
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="text-field"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                onChange={updateUserInfo}
                required
              />
            </Form.Group>
          )}
          {/* This error will appear if the password does not match.*/}
          {newUser && <p className="text-danger text-center">{error}</p>}
          {/* Submit Button for both forms*/}
          <div className="col-md-12 text-center">
            <Button variant="primary" type="submit" className="submit-btn mt-3">
              {" "}
              Submit{" "}
            </Button>
          </div>
          {/* Error Message if user Exist or password invalid */}
          <p className="text-danger text-center">{user.error}</p>
          {/* Button For New User */}
          {!newUser && (
            <p className="text-center mt-2">
              Don't have a account?{" "}
              <button
                onClick={() => setNewUser(true)}
                className="create-account-btn"
              >
                {" "}
                Create Account{" "}
              </button>
            </p>
          )}
          {/* Button For existing user */}
          {newUser && (
            <p className="text-center mt-2">
              Already have an account?{" "}
              <button
                onClick={() => setNewUser(false)}
                className="create-account-btn"
              >
                Login
              </button>
            </p>
          )}
          <p className="text-center">---------- Or ----------</p>
          {/* button for login with google or facebook  */}
          <div className="col-md-12 text-center">
            {/* button for Facebook */}
            <button onClick={fbSignIn} className="authenticate">
              <FontAwesomeIcon className="fb-icon" icon={faFacebook} /> Continue
              With Facebook
            </button>
            <br />
            {/* button for Google Login */}
            <button onClick={googleSignIn} className="mt-2 mb-3 authenticate ">
              {" "}
              <FontAwesomeIcon className="google-icon" icon={faGoogle} />{" "}
              Continue With Gmail
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
