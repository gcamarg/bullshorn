import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "../Contexts/stateProvider";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [action, setAction] = useState("login");
  const [message, setMessage] = useState("");
  const [emailSentBox, setEmailSentBox] = useState(false);

  const { handleLogin, handleSignup } = useContext(StateContext);
  const navigate = useNavigate();

  const logIn = (e) => {
    e.preventDefault();
    setMessage("");
    if (action === "login") {
      handleLogin(username, password).then((res) => {
        if (res.status == "success") {
          navigate("/", { replace: true });
        } else if (res.status == "failed") {
          setMessage(res.message);
        }
      });
    } else if (action === "signup") {
      handleSignup(username, email, password).then((res) => {
        if (res.status == "success") {
          setEmailSentBox(true);
          // document.querySelector(".login__container").classList.add("hidden");
          // document.querySelector(".registeredPopUp").classList.remove("hidden");
        } else {
          setMessage(res.message);
        }
      });
    }
  };
  const showRegisterForm = (e) => {
    e.preventDefault();
    if (action === "signup") {
      e.target.innerHTML = "Create Account";
      document.querySelector(".login__title").innerHTML = "LogIn";
      Array.from(document.querySelectorAll(".emailInput")).map((input) =>
        input.classList.add("hidden")
      );
      setAction("login");
    } else if (action === "login") {
      e.target.innerHTML = "Click here to Login";
      document.querySelector(".login__title").innerHTML = "LogIn";
      Array.from(document.querySelectorAll(".emailInput")).map((input) =>
        input.classList.remove("hidden")
      );
      setAction("signup");
    }
  };

  return (
    <div className="login">
      <Link to="/" className="standard__logo">
        BullsHorn
      </Link>
      {emailSentBox ? (
        <div className="registeredPopUp">
          <h2>A confirmation email was sent to {email}.</h2>
          <button
            className="login__button"
            onClick={(e) => {
              window.location.reload(false);
            }}
          >
            Continuar
          </button>
        </div>
      ) : (
        <div className="login__container">
          <div className="login__block">
            <h1 className="login__title">Login</h1>
            <form action="" className="login__form">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="useremail" className="emailInput hidden">
                E-mail
              </label>
              <input
                className="emailInput hidden"
                type="text"
                id="useremail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="userpassword">Password</label>
              <input
                type="password"
                id="userpassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <h4 className="errorMessage">{message}</h4>
              <button type="submit" className="login__button" onClick={logIn}>
                Continuar
              </button>
            </form>
            <p className="login__terms">
              By continuing, you agree with Bullshorn's{" "}
              <a className="login__hyperlink">Conditions of use</a>. Please read{" "}
              <a className="login__hyperlink">Privacy Notice</a>, and our{" "}
              <a className="login__hyperlink">Cookies Policy</a>.
            </p>
            <div className="login__help">
              <i className="login__colapse"></i>
              <a className="login__hyperlink">Need help?</a>
            </div>
          </div>
          <div className="login__splitter">
            <h5>Create an account now</h5>
          </div>
          <button className="login__signupBt" onClick={showRegisterForm}>
            Create Account
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
