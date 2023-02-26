import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RelationshipScreen from '../screens/RelationshipScreen';
import NewGroupScreen from '../screens/NewGroupScreen';
import GroupSettleScreen from '../screens/GroupSettleScreen';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Relationship' component={RelationshipScreen} />
            <Stack.Screen name='NewGroup' component={NewGroupScreen} />
            <Stack.Screen name='GroupPage' component={GroupSettleScreen} />
        </Stack.Navigator>
    );
}

export default AppStack;