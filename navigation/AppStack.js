import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RelationshipScreen from '../screens/RelationshipScreen';
import NewGroupScreen from '../screens/NewGroupScreen';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Relationship' component={RelationshipScreen} />
            <Stack.Screen name='NewGroup' component={NewGroupScreen} />
        </Stack.Navigator>
    );
}

export default AppStack;