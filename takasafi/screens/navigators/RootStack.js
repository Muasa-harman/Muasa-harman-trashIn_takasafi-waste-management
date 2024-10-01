import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../components/style';


const {primary, tertiary} = Colors;



import Signup from '../screens/Signup';
import Landing from '../screens/Landing';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const RootStack = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "transparent"
                },
                headerTintColor: tertiary,
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingLeft: 20
                }
            }}
            initialRouteName='login'
            >
                <Stack.Screen name="login" component={Login}/>
                <Stack.Screen name="signup" component={Signup}/>
                <Stack.Screen options={{headerTintColor: primary}} name="landing" component={Landing}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;