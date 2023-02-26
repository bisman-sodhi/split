import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0,0,0,0.8)' :'rgba(0,0,0,0.3)' ;
    return (
        <View
            style={{
                width:5,
                height:5,
                marginHorizontal:3,
                backgroundColor
            }}
        />
    )
}

const Skip = ({...props}) => (
    <Button 
        title="Skip"
        color="#000000"
        {...props}
    />
);

const Next = ({...props}) => (
    <Button 
        title="Next"
        color="#000000"
        {...props}
    />
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:8}}
        {...props}
    ><Text style={{fontSize:16}}>Done</Text></TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => 
            navigation.navigate("Login")}
        pages={[
        {
            backgroundColor: '#a6e4d0',
            image: <Image source={require('../assets/first.png')} />,
            title: 'Onboarding 1',
            subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
            backgroundColor: '#fdeb93',
            image: <Image source={require('../assets/first.png')} />,
            title: 'Onboarding 2',
            subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
            backgroundColor: '#e9bcbe',
            image: <Image source={require('../assets/first.png')} />,
            title: 'Onboarding 3',
            subtitle: 'Done with React Native Onboarding Swiper',
        },
        ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});