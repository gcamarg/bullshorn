import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

function EmailConfirmedPage() {
  const { token } = useParams();
  console.log(token);

  useEffect(() => {
    const uri =
      "http://localhost:8080/api/v1/registration/confirmation?token=" + token;
    const response = async () => {
      return await api.get(uri);
    };
    const res = response();
    console.log(uri);
  }, [token]);

  return <div>Email Confirmed</div>;
}

export default EmailConfirmedPage;
