import React from "react";
import { Platform } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import styled from "styled-components/native";


const Container = styled.View`
    margin-left: 5px;
`;

const isAndroid = Platform.OS === "android";

export default () => <Container>
    <Ionicons  name={isAndroid?"md-arrow-down":"ios-arrow-down"} size={20}></Ionicons>
</Container>