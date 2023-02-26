import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = () => {
    const {user, logout} = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome {user.uid}</Text>
            <FormButton buttonTitle='Logout' onPress={()=> logout()}/>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fadfd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }, 
    text: {
        fontSize: 20,
        color: '#333333'
    }
})
