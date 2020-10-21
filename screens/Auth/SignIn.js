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
    const [password, setPassword] = useState("");
    const handleSubmit = () => { alert(`${username}, ${password}`);}
    return (
    
    <Container>
        <StatusBar style="dark"/>
        <KeyboardAvoidingView>
            <InputContainer>
                <Input value={username} autoCapitalize="none" placeholder="Username" onChangeText={text=>setUsername(text)}></Input>
                <Input value={password} placeholder="Password" onChangeText={text=>setPassword(text)} secureTextEntry></Input>
            </InputContainer>
        </KeyboardAvoidingView>
        <AuthButton text={"Sing In"} accent onPress={handleSubmit}></AuthButton>
    </Container>
)
}