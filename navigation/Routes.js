import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import auth from '@react-native-firebase/auth';
import auth from '../firebase_setup/firebase';
import { AuthContext } from './AuthProvider';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
    //const auth = getAuth();
    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        //const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        const subscriber = onAuthStateChanged(auth, onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    return (
        <NavigationContainer>
          {/* { user ? <AppStack/> : <AuthStack/> } */}
          <AppStack/>
        </NavigationContainer>
    );
};

export default Routes;