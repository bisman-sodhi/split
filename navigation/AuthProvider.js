import React, { createContext, useState } from 'react';
//import auth from '@react-native-firebase/auth';
import { getAuth } from 'firebase/auth';
import auth from '../firebase_setup/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    //const auth = getAuth();
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await signInWithEmailAndPassword(auth, email, password);
                    } catch (e) {
                        console.log(e);
                    }
                },
                register: async(email, password) => {
                    try {
                        await createUserWithEmailAndPassword(auth,email,password);
                    } catch (e) {
                        console.log(e);
                    }
                    
                },
                logout: async() => {
                    try {
                        console.log("here");
                        await auth.signOut();
                        console.log(user);
                    } catch (e) {
                        console.log(e);
                    }
                },
            }}
        >
        {children}
        </AuthContext.Provider>
    );
};