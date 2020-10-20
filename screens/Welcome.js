import React from "react";
import { View, Text, Button } from "react-native";

export default (props) => {
    const {
        navigation
    } = props;
    console.log(props);
    return <View style={{justifyContent: "center", alignItems: "center", display: "flex", flex: 1}}>
        <Text>Welcome!</Text>
            <Button onPress = { ()=> navigation.navigate("SignIn") } title={"Sign In"} />
            <Button onPress = { ()=> navigation.navigate("SignUp") } title={"Sign Up"} />
        </View>
}