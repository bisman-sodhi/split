import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
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

function getRelationship(id) {
    const q = doc(firestore, "users", id);
    const [userData, isLoading] = useDocumentData(q);
    return { userData };
  }

// add update to other person's too!
function addAmount(changeAmount, current, uid, otherUID) {
    // console.log(typeof parseFloat(current,10));
    // console.log(typeof parseFloat(changeAmount,10));
    const currentNum = parseFloat(current,10);
    const changeAmountNum = parseFloat(changeAmount,10);
    const myNewBalance = currentNum+changeAmountNum;
    updateDoc(doc(firestore, "users", uid), {
        "relationships": {[otherUID]:myNewBalance},
    })
}

function subtractAmount(changeAmount, current, uid, otherUID) {
    const currentNum = parseFloat(current,10);
    const changeAmountNum = parseFloat(changeAmount,10);
    const myNewBalance = currentNum-changeAmountNum;
    updateDoc(doc(firestore, "users", uid), {
        "relationships": {[otherUID]:myNewBalance},
    })
}

function addEvenAmount(changeAmount, current, uid, otherUID) {
    const currentNum = parseFloat(current,10);
    const changeAmountNum = parseFloat(changeAmount,10);
    const myNewBalance = currentNum+0.5*changeAmountNum;
    updateDoc(doc(firestore, "users", uid), {
        "relationships": {[otherUID]:myNewBalance},
    })
}

function subtractEvenAmount(changeAmount, current, uid, otherUID) {
    const currentNum = parseFloat(current,10);
    const changeAmountNum = parseFloat(changeAmount,10);
    const myNewBalance = currentNum-0.5*changeAmountNum;
    updateDoc(doc(firestore, "users", uid), {
        "relationships": {[otherUID]:myNewBalance},
    })
}

const RelationshipScreen = ({route}) => {
    const { otherUID } = route.params;
    const { userData, isLoading } = getRelationship("s2SC6l4b6CSp67MDwWAPkYCFDNI2");
    const [changeAmount, setchangeAmount] = useState();
    const [totalChangeAmount, setTotalChangeAmount] = useState();
    while(isLoading);
    if (userData) {
        const amount = userData.relationships[otherUID];
        const positiveAmount = amount > 0;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Your Balance With {otherUID}</Text>
                { positiveAmount ? <Text style={styles.positiveText}>{amount}</Text> :  <Text style={styles.negativeText}>{amount}</Text>}
                <FormInput 
                labelValue={changeAmount}
                onChangeText={(changeAmount2) => setchangeAmount(changeAmount2)}
                placeholderText="Amount"
                keyboardType="decimal-pad"
                iconType="tags"
                />
                <FormButton buttonTitle='I Owe' onPress={()=> {subtractAmount(changeAmount, amount,"s2SC6l4b6CSp67MDwWAPkYCFDNI2",otherUID)}}/>
                <FormButton buttonTitle='They Owe' onPress={()=> {addAmount(changeAmount, amount,"s2SC6l4b6CSp67MDwWAPkYCFDNI2",otherUID)}}/>
                <FormInput 
                labelValue={totalChangeAmount}
                onChangeText={(totalChangeAmount2) => setTotalChangeAmount(totalChangeAmount2)}
                placeholderText="Total Amount"
                keyboardType="decimal-pad"
                iconType="tags"
                />
                <FormButton buttonTitle='Split Evenly (I paid)' onPress={()=> {addEvenAmount(totalChangeAmount, amount,"s2SC6l4b6CSp67MDwWAPkYCFDNI2",otherUID)}}/>
                <FormButton buttonTitle='Split Evenly (They paid)' onPress={()=> {subtractEvenAmount(totalChangeAmount, amount,"s2SC6l4b6CSp67MDwWAPkYCFDNI2",otherUID)}}/>
            </View>
        );
    }
}

export default RelationshipScreen;

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
