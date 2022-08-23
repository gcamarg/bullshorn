import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { server } from "../../utils/api";
import constants from "../../utils/constants";

function EmailConfirmedPage() {
  const { token } = useParams();

  const [status, setStatus] = useState("waiting");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const uri =
      constants.SERVER_PATH +
      "/api/v1/registration/confirmation?token=" +
      token;
    server
      .get(uri)
      .then((res) => {
        if (res.status === 200) {
          setStatus("success");
        }
      })
      .catch((err) => {
        setStatus("failed");
        setResponseMessage(err.response.data);
      });
  }, [token]);

  return (
    <>
      <div className="message__container">
        <Link to="/" className="standard__logo">
          BullsHorn
        </Link>
        {status === "success" ? (
          <h2>
            Your e-mail has been confirmed! Click <Link to="/login">HERE</Link>{" "}
            to login.
          </h2>
        ) : status === "failed" ? (
          <h2>{responseMessage}</h2>
        ) : (
          <h2>Processing ...</h2>
        )}
      </div>
    </>
  );
}

export default EmailConfirmedPage;
