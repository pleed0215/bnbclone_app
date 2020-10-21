import React from "react";
import {TouchableOpacity, Dimensions} from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import ThemeColor from "../../color";

const { width, height } = Dimensions.get("screen");

const Container = styled.TextInput`
    width: ${width / 1.5}px;
    padding: 10px 20px;
    border: 1px solid gray;
    border-radius: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: white;
`;

const Input = (props) => (
    <Container {...props}/>
)

export default Input;