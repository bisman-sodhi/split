import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
//import VeryfiLens from '@veryfi/react-native-veryfi-lens';
import {
    collection,
    doc,
    orderBy,
    query,
    setDoc,
    where,
    updateDoc,
  } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import {
    useCollectionData, useDocumentData,
  } from "react-firebase-hooks/firestore";
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import axios from 'axios';

function getGroup(id) {
    const q = doc(firestore, "groups", id);
    const [groupData, isLoading] = useDocumentData(q);
    return { groupData };
  }

  function getRelationship(id) {
    const q = doc(firestore, "users", id);
    const [userData, isLoading] = useDocumentData(q);
    return { userData };
  }

  // assume person inputting it paid for it
  function splitAmount(changeAmount, groupIDs, count, userData) {
        for (var person in groupIDs) {
            let amount = 0;
            if (userData.relationships[groupIDs[person]] && userData.uid != groupIDs[person]) {
                amount = userData.relationships[groupIDs[person]];
            } 
            if (userData.uid != groupIDs[person]) {
                console.log(groupIDs[person]);
                const currentNum = parseFloat(amount,10);
                const changeAmountNum = parseFloat(changeAmount,10);
                const myNewBalance = currentNum+changeAmountNum/count;
                updateDoc(doc(firestore, "users", userData.uid), {
                    [`relationships.${groupIDs[person]}`]: myNewBalance,
                })
                //const otherUserCurrentNum = currentNum*(-1);
                const otherUserNewBalance = myNewBalance*(-1);
                updateDoc(doc(firestore, "users", groupIDs[person]), {
                    [`relationships.${userData.uid}`]: otherUserNewBalance,
                })

            }
            //console.log(amount);
        }
        alert("Split Recorded!");
  }

const GroupSettleScreen = ({route}) => {
    const { groupID } = route.params;
    const {groupData} = getGroup(groupID);
    const [changeAmount, setchangeAmount] = useState();
    const { userData, isLoading } = getRelationship("s2SC6l4b6CSp67MDwWAPkYCFDNI2");
    if (groupData && userData) {
        var count = 0;
        for (var i in groupData.groupIDs) {
            if (groupData.groupIDs.hasOwnProperty(i)) count++;
        }
        
        return (
                <View style={styles.container}>
                    <Text style={styles.text}>Welcome User! {count} </Text> 
                    <FormInput 
                    labelValue={changeAmount}
                    onChangeText={(changeAmount2) => setchangeAmount(changeAmount2)}
                    placeholderText="Amount"
                    keyboardType="decimal-pad"
                    iconType="tags"
                    />
                    <FormButton buttonTitle='Split!' onPress={()=> {splitAmount(changeAmount, groupData.groupIDs, count, userData)}}/> 
                </View>
                
        );
    }
}

export default GroupSettleScreen;

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
    }
})