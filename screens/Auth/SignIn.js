import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../../Components/Auth/Btn";
import Input from "../../Components/Auth/Input";

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

  const handleSubmit = () => {
    alert(`${email}, ${password}`);
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
      <AuthButton text={"Sing In"} accent onPress={handleSubmit}></AuthButton>
    </Container>
  );
};
