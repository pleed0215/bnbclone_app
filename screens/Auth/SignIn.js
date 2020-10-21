import React, {useState} from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../../Components/Auth/Btn";
import Input from "../../Components/Auth/Input";

const Container = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`;
const TextInput = styled.TextInput``;

export default () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => { alert(`${username}, ${password}`);}
    return (
    
    <Container>
        <Input value={username} autoCapitalize="none" placeholder="Username" onChangeText={text=>setUsername(text)}></Input>
        <Input value={password} placeholder="Password" onChangeText={text=>setPassword(text)} secureTextEntry></Input>
        <AuthButton text={"Sing In"} accent onPress={handleSubmit}></AuthButton>
    </Container>
)
}