import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import OnBoardingScreen from '../screens/OnboardingScreen';
import PeopleScreen from '../screens/PeopleScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='OnBoarding' component={OnBoardingScreen} />
                <Stack.Screen name='People' component={PeopleScreen} />
                <Stack.Screen name='Signup' component={SignupScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppStack;