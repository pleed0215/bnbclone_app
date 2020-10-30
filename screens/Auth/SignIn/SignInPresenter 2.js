import { StatusBar } from "expo-status-bar";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import AuthButton from "../../../Components/Auth/Btn";
import Input from "../../../Components/Auth/Input";
import { KeyboardAvoidingView } from "react-native";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const InputContainer = styled.View`
  margin-bottom: 30px;
`;

const SignInPresenter = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  handleSubmit,
}) => (
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

SignInPresenter.propTypes = {
  email: PropTypes.string,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string,
  setPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SignInPresenter;
