import React, { useState } from "react";

import api from "../../../api";
import utils from "../../../utils";

import Presenter from "./Presenter";

export default ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    if (!utils.isEmail(email)) {
      alert("Not correct email address.");
      return;
    }
    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      password1 === "" ||
      password1 !== password2
    ) {
      alert("All field are required and password verification needed.");
      return;
    }

    try {
      const data = await api.createAccount({
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: email,
        password: password1,
      });
      if (data.status === 201) {
        alert("Account created successfully, sign in please.");
        navigation.navigate("SignIn", { email, password: password1 });
      }
    } catch (e) {
      alert(e);
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Presenter
      email={email}
      setEmail={setEmail}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      password1={password1}
      setPassword1={setPassword1}
      password2={password2}
      setPassword2={setPassword2}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};
