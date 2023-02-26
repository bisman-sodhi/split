import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import UserButton from '../components/UserButton';
import { uuidv4 } from '@firebase/util';

import {
    collection,
    doc,
    orderBy,
    query,
    setDoc,
    where,
    updateDoc,
  } from "firebase/firestore";
import { firestore, getAuth } from "../firebase_setup/firebase";
import {
    useCollectionData, useDocumentData,
  } from "react-firebase-hooks/firestore";
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import axios from 'axios';
import UserList from '../components/UserList';

function createGroup(groupIDs, groupName) {
    const id = uuidv4();
    setDoc(doc(firestore, "groups", id), {
        id,
        groupIDs,
        groupName,
    })
    alert("Group created!")
}
const auth = getAuth()
const selected = [auth.currentUser.uid];
function adjustSelection(uid) {
     if (!selected.includes(uid)) {
        selected.push(uid);
    } else {
        var index = selected.indexOf(uid);
        if (index !== -1) {
            selected.splice(index, 1);
        }
    }
    console.log(selected);
    }

function getUsers() {
    const q = query(collection(firestore, "users"));
    const [users,isLoading, error] = useCollectionData(q);

    if (error) throw error;
    return {users, isLoading}; 
}

const NewGroupScreen = () => {
    const [groupName, setGroupName] = useState();
    const {users, isLoading} = getUsers();
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Create Group </Text>
                <FormInput 
                labelValue={groupName}
                onChangeText={(groupName2) => setGroupName(groupName2)}
                placeholderText="Group Name"
                iconType="team"
                />
                <View >
                    {users?.length ===0 ? (
                <Text textAlign="center" fontSize="xl">
                    No other users yet...</Text>
                ) : (
                    // users?.map((user) => (selected.includes(user.uid) ? <ColoredUserButton user={user} onPress={() => {removeUserFromSelected(user.uid)}}/> : <UserButton user={user} onPress={() => {addUserToSelected(user.uid)}}/>))
                    users?.map((user) => <UserButton user={user} onPress={() => {adjustSelection(user.uid)}}/>)
                )}

                </View>
                <FormButton buttonTitle='Create Group!' onPress={()=> {createGroup(selected, groupName)}}/>
            </View>
        );
}

export default NewGroupScreen;

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
    positiveText: {
        fontSize: 40,
        color: '#00FF00'
    },
    negativeText: {
        fontSize: 40,
        color: '#FF0000'
    },
    btn: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#FFB6C1',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Lato-Regular',
      },
})