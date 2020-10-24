import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { apiLogin } from "../../../redux/usersSlice";
import utils from "../../../utils";

import SignInPresenter from "./SignInPresenter";

export default ({ route: { params } }) => {
  const [email, setEmail] = useState(params?.email);
  const [password, setPassword] = useState(params?.password);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    if (!isFormValid()) return;
    dispatch(apiLogin({ username: email, password }));

    setLoading(false);
  };

  const isFormValid = () => {
    if (email === "" || password === "") {
      alert("all field are required.");
      return false;
    }
    if (!utils.isEmail(email)) {
      alert("Email address you put is invalid.");
      return false;
    }
    return true;
  };

  return (
    <SignInPresenter
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};
