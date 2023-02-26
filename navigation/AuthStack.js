import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignupScreen from '../screens/SignupScreen';
import PeopleScreen from '../screens/PeopleScreen';

import icon from "react-native-vector-icons/FontAwesome"
import FontAwesome from 'react-fontawesome';

// import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
      // const [isFirstLauch, setIsFirstLaunch] = React.useState(null);

  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then(value => {
  //     if (value==null) {
  //       AsyncStorage.setItem('alreadyLaunched', 'true');
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   });
  // }, []);

  // if (isFirstLauch == null) {
  //   return null;
  // } else if (isFirstLauch == true) {
  //   return (
  //     <NavigationContainer>
  //       <AppStack.Navigator
  //         headerMode='none'
  //       >
  //         <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
  //         <AppStack.Screen name="Login" component={LoginScreen} />
  //       </AppStack.Navigator>
  //     </NavigationContainer>
  //   );
  // } else {
  //   <LoginScreen/>
  // }

  return (
      <Stack.Navigator initialRouteName={"Onboarding"}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{header: () => null}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{header: () => null}} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name='People' component={PeopleScreen} />
      </Stack.Navigator>
  );
};

export default AuthStack;

{/* <Stack.Screen name="SignUp" component={SignupScreen} options={({navigation}) => ({
  title: '',
  headerStyle: {
    backgroundColor: '#f9fafd',
    shadowColor: '#f9fafd',
  },
  headerLeft: () => (
    <View style={{marginLeft: 10}}>
      <FontAwesome.Button name="long-arrow-left" size={25} backgroundColor="#f9fafd" color="#333" onPress={()=>navigation.navigate('Login')}/>
    </View>
  )
})} /> */}