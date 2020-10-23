import React from "react";
import {TouchableOpacity, Dimensions, ActivityIndicator} from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import ThemeColor from "../../color";

const { width, height } = Dimensions.get("screen");

const Button = styled.View`
    width: ${width / 1.5}px;
    background-color: ${props=>props.accent ? ThemeColor.red : "transparent"};
    padding: 10px 0px;
    align-items: center;
    border-radius: 30px;
    border: 1px solid ${props => props.accent?"transparent": ThemeColor.black};
    margin: 5px;
`;
const Text = styled.Text`
    color: ${ props => props.accent?"white":"black"};
    font-weight: 600;
    font-size: 16px;
`;

const AuthButton = ({onPress, text, accent = false, loading=false}) => (
<TouchableOpacity onPress={loading?null:onPress}>
    <Button accent={accent}>
        {loading ? <ActivityIndicator color={accent?"white":"black"}/> :<Text accent={accent}>{text}</Text>}
    </Button>
</TouchableOpacity>
);

AuthButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    accent: PropTypes.bool,
    loading: PropTypes.bool,
}

export default AuthButton;

