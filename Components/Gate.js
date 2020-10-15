import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {connect, useDispatch, useSelector} from "react-redux";

import {login, logout } from "../redux/usersSlice";


export default () => {
    const userSlice = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    console.log(userSlice);
    const { isLoggedIn } = userSlice;
    return <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
        {isLoggedIn ? 
            <TouchableOpacity onPress={()=>dispatch(logout())}>
                <Text>Log out</Text>
            </TouchableOpacity>: 
            <TouchableOpacity onPress={()=>dispatch(login({token: "token"}))}>
                <Text>Log in</Text>
            </TouchableOpacity>
            }
    </View>
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