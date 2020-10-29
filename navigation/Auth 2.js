import React from "react";
import { createStackNavigator} from "@react-navigation/stack";

import Welcome from "../screens/Auth/Welcome";
import SignIn from "../screens/Auth/SignIn";
import SignUp from "../screens/Auth/SignUp";

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
    <Auth.Screen name="SignIn" component={SignIn} options={{title: "Sign in"}}/>
    <Auth.Screen name="SignUp" component={SignUp} options={{title: "Sign up"}}/>
</Auth.Navigator>