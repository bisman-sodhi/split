import React, {useContext, useState} from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import SocialButton from "../components/SocialButton";
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const {register} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create an account!</Text>
            <FormInput 
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect="false"
            />
            <FormInput 
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormInput 
                labelValue={phoneNumber}
                onChangeText={(userPhoneNumber) => setPhoneNumber(userPhoneNumber)}
                placeholderText="Enter Phone Number As +1xxxxxxxxxx"
                autoCapitalize="none"
                autoCorrect="false"
            />
            <FormButton 
                buttonTitle="Sign Up"
                onPress={() => register(email, password, phoneNumber)}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
              <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.navButtonText}>Have an account? Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
      },
      text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
      },
      navButton: {
        marginTop: 15,
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
      },
      textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
      },
      color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'grey',
      },
});