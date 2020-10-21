import React from "react";
import {TouchableOpacity, Dimensions} from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import ThemeColor from "../../color";

const { width, height } = Dimensions.get("screen");

const Container = styled.TextInput`
    width: ${width / 2}px;
`;

const Input = (props) => (
    <Container props={{...props}}/>
)