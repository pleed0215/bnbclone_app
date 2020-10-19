import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {connect, useDispatch, useSelector} from "react-redux";
import Auth from "../navigation/Auth";

import {login, logout } from "../redux/usersSlice";


export default () => {
    const userSlice = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const { isLoggedIn } = userSlice;
    return <NavigationContainer>
        {isLoggedIn ? 
            <TouchableOpacity onPress={()=>dispatch(logout())}>
                <Text>Log out</Text>
            </TouchableOpacity>:<Auth /> 
            /*<TouchableOpacity onPress={()=>dispatch(login({token: "token"}))}>
                <Text>Log in</Text>
            </TouchableOpacity>*/
            }
    </NavigationContainer>
}

/*const Gate = (props) => {
    console.log('props');
    console.log(props);
    const { isLoggedIn } = props;
    return <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
        {isLoggedIn ? 
            <Text>Welcome</Text> : <Text>You need to log in.</Text>
            }
    </View>
}


const mapStateToProps = (state) => {
    console.log('state');
    console.log(state);
    return { isLoggedIn: false };
}

export default connect(mapStateToProps)(Gate);*/