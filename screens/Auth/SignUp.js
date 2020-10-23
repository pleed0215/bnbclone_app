import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../../Components/Auth/Btn";
import Input from "../../Components/Auth/Input";

import { createAccount } from "../../api";
import {isEmail} from "../../utils";

const Container = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`;
const InputContainer = styled.View`
    margin-bottom: 30px;
`;

export default () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const handleSubmit = async () => { 
        if (!isEmail(email)) {
            alert("Not correct email address.");
            return;
        }
        if (email === "" || firstName === "" || lastName === "" || password1 === "" || password1 !== password2) {
            alert ("All field are required and password verification needed.");
            return;
        }

        try {
            const data = await createAccount({
                first_name: firstName,
                last_name: lastName,
                email: email,
                username: email,
                password: password1
            })
        } catch (e) {
            console.warn(e);
        }
    }
    return (
    
    <Container>
        <StatusBar style="dark"/>
        <KeyboardAvoidingView behavior="position">
            <InputContainer>
                <Input value={email} keyboardType={"email-address"} autoCapitalize="none" placeholder="Email address" onChangeText={text=>setEmail(text)}></Input>
                <Input value={firstName} autoCapitalize="words" placeholder="First name" onChangeText={text=>setFirstName(text)}></Input>
                <Input value={lastName} autoCapitalize="words" placeholder="Last name" onChangeText={text=>setLastName(text)}></Input>
                <Input value={password1} textContentType={'oneTimeCode'} placeholder="Password" onChangeText={text=>setPassword1(text)} secureTextEntry></Input>
                <Input value={password2} textContentType={'oneTimeCode'} placeholder="Verfiy Password" onChangeText={text=>setPassword2(text)} secureTextEntry></Input>
            </InputContainer>
        </KeyboardAvoidingView>
        <AuthButton text={"Sing Up"} accent onPress={handleSubmit}></AuthButton>
    </Container>
)
    }