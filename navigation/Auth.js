import React from "react";
import { createStackNavigator} from "@react-navigation/stack";

import Welcome from "../screens/Welcome";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

import BackBtn from "../Components/Auth/BackBtn";

const Auth = createStackNavigator();


export default () => <Auth.Navigator 
                        mode="modal" headerMode="float" 
                        screenOptions={
                            {
                                headerBackTitleVisible: false, 
                                headerTransparent: true,
                                headerBackImage: ()=>(
                                    <BackBtn/>
                                ),
                                headerTitleStyle: {
                                    color: "gray"
                                }
                            }
                        }>
    <Auth.Screen name="Welcome!" component={Welcome} />
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
</Auth.Navigator>