import React, { createContext, useState } from 'react';
//import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = () => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async () => {

                },
                logout: async() => {
                    // try {
                    //     //await auth.signOut();
                    // } catch (e) {
                    //    // console.log(e);
                    // }
                },
            }}
        >
        </AuthContext.Provider>
    );
};