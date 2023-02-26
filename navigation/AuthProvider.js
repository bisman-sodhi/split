import React, { createContext, useState } from 'react';
//import auth from '@react-native-firebase/auth';
import { getAuth } from 'firebase/auth';
//import auth from '../firebase_setup/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { uuidv4 } from "@firebase/util";
import {
    collection,
    doc,
    orderBy,
    query,
    setDoc,
    where,
  } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import {
    useCollectionData, useDocumentData,
  } from "react-firebase-hooks/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const auth = getAuth();
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
                register: async(email, password,phoneNumber, displayName) => {
                    try {
                        await createUserWithEmailAndPassword(auth,email,password).then(function(data){
                            console.log(data.user.uid);
                            const uid = data.user.uid
                            setDoc(doc(firestore, "users", uid), {
                                uid,
                                phoneNumber,
                                email,
                                displayName,
                                "relationships": {"e5O0TWEqeCNw4nZEpZ5TgueDzpv1":0},
                            })
                          }).catch(function(error) {
                              //Handle error
                          });
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