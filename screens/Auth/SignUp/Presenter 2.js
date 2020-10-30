import React from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Keyboard } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../../../Components/Auth/Btn";
import Input from "../../../Components/Auth/Input";

import PropTypes from "prop-types";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const InputContainer = styled.View`
  margin-bottom: 30px;
`;

const Presenter = ({
  email,
  setEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  password1,
  setPassword1,
  password2,
  setPassword2,
  loading,
  handleSubmit,
}) => (
  <Container>
    <StatusBar style="dark" />
    <KeyboardAvoidingView behavior="position">
      <InputContainer>
        <Input
          value={email}
          keyboardType={"email-address"}
          autoCapitalize="none"
          placeholder="Email address"
          onChangeText={(text) => setEmail(text)}
        ></Input>
        <Input
          value={firstName}
          autoCapitalize="words"
          placeholder="First name"
          onChangeText={(text) => setFirstName(text)}
        ></Input>
        <Input
          value={lastName}
          autoCapitalize="words"
          placeholder="Last name"
          onChangeText={(text) => setLastName(text)}
        ></Input>
        <Input
          value={password1}
          blurOnSubmit
          onSubmitEditing={() => Keyboard.dismiss()}
          textContentType={"oneTimeCode"}
          placeholder="Password"
          onChangeText={(text) => setPassword1(text)}
          secureTextEntry
        ></Input>
        <Input
          value={password2}
          blurOnSubmit
          onSubmitEditing={() => Keyboard.dismiss()}
          textContentType={"oneTimeCode"}
          placeholder="Verfiy Password"
          onChangeText={(text) => setPassword2(text)}
          secureTextEntry
        ></Input>
      </InputContainer>
    </KeyboardAvoidingView>
    <AuthButton
      loading={loading}
      text={"Sing Up"}
      accent
      onPress={handleSubmit}
    ></AuthButton>
  </Container>
);

Presenter.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password1: PropTypes.string.isRequired,
  setPassword1: PropTypes.string.isRequired,
  password2: PropTypes.string.isRequired,
  setPassword2: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  setFirstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  setLastName: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Presenter;
