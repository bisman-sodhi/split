import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import { TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation}) => {
    const {user, logout} = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome User!</Text>  
            <Text style={styles.text}>Groups</Text>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('NewGroup')}>
              <Text style={styles.navButtonText}>Create New Group</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Relationship', {otherUID: "e5O0TWEqeCNw4nZEpZ5TgueDzpv1"})}>
              <Text style={styles.navButtonText}>Go to Relationship Page</Text>
            </TouchableOpacity>
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
    },
    navButton: {
        marginTop: 15,
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
      },
})
