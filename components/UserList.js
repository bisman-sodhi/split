import UserButton from "./UserButton";
import ColoredUserButton from "./ColoredUserButton";
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import { useState } from "react";

export default function UserList({users}){
    const selected = [];
    function adjustSelection(uid) {
        console.log("here");
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
    return (
    <View >
        {users?.length ===0 ? (
    <Text textAlign="center" fontSize="xl">
        No other users yet...</Text>
    ) : (
        // users?.map((user) => (selected.includes(user.uid) ? <ColoredUserButton user={user} onPress={() => {removeUserFromSelected(user.uid)}}/> : <UserButton user={user} onPress={() => {addUserToSelected(user.uid)}}/>))
        users?.map((user) => <UserButton user={user} onPress={() => {adjustSelection(user.uid)}}/>)
    )}

    </View>
);
}
const styles = StyleSheet.create({
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
  });