import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
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

export default () => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const handleSubmit = () => { alert(`${username}, ${password1}, ${password2}, ${firstName}, ${lastName}`);}
    return (
    
    <Container>
        <StatusBar style="dark"/>
        <KeyboardAvoidingView behavior="position">
            <InputContainer>
                <Input value={username} autoCapitalize="none" placeholder="Username" onChangeText={text=>setUsername(text)}></Input>
                <Input value={firstName} autoCapitalize placeholder="First name" onChangeText={text=>setFirstName(text)}></Input>
                <Input value={lastName} autoCapitalize placeholder="Last name" onChangeText={text=>setLastName(text)}></Input>
                <Input value={password1} placeholder="Password" onChangeText={text=>setPassword1(text)} secureTextEntry></Input>
                <Input value={password2} placeholder="Verfiy Password" onChangeText={text=>setPassword2(text)} secureTextEntry></Input>
            </InputContainer>
        </KeyboardAvoidingView>
        <AuthButton text={"Sing In"} accent onPress={handleSubmit}></AuthButton>
    </Container>
)
    }