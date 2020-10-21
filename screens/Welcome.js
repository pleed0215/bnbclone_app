import { StatusBar } from "expo-status-bar";
import React from "react";
import { BlurView} from "expo-blur";
import { View, Text, Button } from "react-native";

import styled from "styled-components/native";

const LOGO_URL = "https://maybugs.com/news/photo/201808/625096_485796_2158.png";

const Container = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;


const Image = styled.Image`
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
`;

const Logo = styled.Image`
    width: 100px;
    height: 100px;
`;

export default (props) => {
    const {
        navigation
    } = props;
    console.log(props);
    return <Container>
                <StatusBar style="light"/>
                <BlurView tint="light" intensity={50} style={{flex:1, width: "100%", alignItems: "center", justifyContent: "center"}}>
                    <Logo source={require("../assets/logo.png")}/>
                </BlurView>
                <Image resizeMethod="resize" source={require("../assets/lolo.jpg")}/>
        </Container>
}

//<Image resizeMethod="scale" source={require("../assets/login_splash.jpg")}/>