import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import AuthButton from "../../Components/Auth/Btn";
import Input from "../../Components/Auth/Input";

import { apiLogin } from "../../redux/usersSlice";
import utils from "../../utils";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const InputContainer = styled.View`
  margin-bottom: 30px;
`;

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
    <Container>
      <StatusBar style="dark" />
      <KeyboardAvoidingView>
        <InputContainer>
          <Input
            value={email}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          ></Input>
          <Input
            value={password}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          ></Input>
        </InputContainer>
      </KeyboardAvoidingView>
      <AuthButton
        loading={loading}
        text={"Sing In"}
        accent
        onPress={handleSubmit}
      ></AuthButton>
    </Container>
  );
};
