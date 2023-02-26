import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RelationshipScreen from '../screens/RelationshipScreen';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Relationship' component={RelationshipScreen} />
        </Stack.Navigator>
    );
}

export default AppStack;