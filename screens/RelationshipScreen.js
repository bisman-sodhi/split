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
        [`relationships.${otherUID}`]: myNewBalance,
    })
    const otherUserNewBalance = myNewBalance*(-1);
    updateDoc(doc(firestore, "users", otherUID), {
        [`relationships.${uid}`]: otherUserNewBalance,
    })
}

function subtractAmount(changeAmount, current, uid, otherUID) {
    const currentNum = parseFloat(current,10);
    const changeAmountNum = parseFloat(changeAmount,10);
    const myNewBalance = currentNum-changeAmountNum;
    updateDoc(doc(firestore, "users", uid), {
        [`relationships.${otherUID}`]: myNewBalance,
    })
    const otherUserNewBalance = myNewBalance*(-1);
    updateDoc(doc(firestore, "users", otherUID), {
        [`relationships.${uid}`]: otherUserNewBalance,
    })
}

function addEvenAmount(changeAmount, current, uid, otherUID) {
    const currentNum = parseFloat(current,10);
    const changeAmountNum = parseFloat(changeAmount,10);
    const myNewBalance = currentNum+0.5*changeAmountNum;
    updateDoc(doc(firestore, "users", uid), {
        [`relationships.${otherUID}`]: myNewBalance,
    })
    const otherUserNewBalance = myNewBalance*(-1);
    updateDoc(doc(firestore, "users", otherUID), {
        [`relationships.${uid}`]: otherUserNewBalance,
    })
}

function subtractEvenAmount(changeAmount, current, uid, otherUID) {
    const currentNum = parseFloat(current,10);
    const changeAmountNum = parseFloat(changeAmount,10);
    const myNewBalance = currentNum-0.5*changeAmountNum;
    updateDoc(doc(firestore, "users", uid), {
        [`relationships.${otherUID}`]: myNewBalance,
    })
    const otherUserNewBalance = myNewBalance*(-1);
    updateDoc(doc(firestore, "users", otherUID), {
        [`relationships.${uid}`]: otherUserNewBalance,
    })
}

async function testReceipt() {
    // console.log("in here");
    // const Client = require('@veryfi/veryfi-sdk');
    // const client_id = 'vrfKlYaAIRVeuSc2J1T2c8GT4UXB9ceThfgh1Ed';
    // const client_secret = '0YzVCu95CGK9pYcaXFEcLrYxtGVeiYnkw9ZAL5FABI42mKEs93PPox9uNVj3ceOR2Sxo76htX54v2lOyEs0AuSyh1RD4kTiOWXwtHZTOnNFPEBmOR53Pb02PepZ7PmK1';
    // const username = 'laurenjdaniel3';
    // const api_key = '70ce3ba524ad325175c4310af8c80f99';
    
    // const file_path = '../assets/cpg-receipt-grocery.jpeg';
    // const veryfiLensSettings = {
    //     blurDetectionIsOn: true,
    //     autoLightDetectionIsOn: false,
    //     documentTypes: ['receipt'],
    //     showDocumentTypes: true,
    //     dataExtractionEngine: 'api',
    //   };

    // const VeryfiLensEmitter = new NativeEventEmitter(VeryfiLens.NativeModule);
    // let hasListeners = false;
    // const mindee = require("mindee");
    // const mindeeClient = new mindee.Client({ apiKey: "d85dbd90a26920cd75ddc370ca53e5a4" });

    // // Load a file from disk and parse it
    // const doc = mindeeClient.docFromPath("../assets/cpi-receipt-grocery.jpeg");
    // const respPromise = doc.parse(mindee.ReceiptV4);

    // // Print a summary of the parsed data
    // respPromise.then((resp) => {
    // if (resp.document === undefined) return;

    // console.log(resp.document.toString());
    // });

}
export function getName(otherUID) {
    const q = doc(firestore, "users", otherUID);
    const [otherUser, isLoading] = useDocumentData(q);
    console.log(otherUID);
    return { otherUser, isLoading };
  }

const RelationshipScreen = ({route}) => {
    const { otherUID } = route.params;
    const { userData, isLoading } = getRelationship("s2SC6l4b6CSp67MDwWAPkYCFDNI2");
    const { otherUser, isLoading2 } = getName(otherUID);
    const [changeAmount, setchangeAmount] = useState();
    const [totalChangeAmount, setTotalChangeAmount] = useState();
    while(isLoading);
    if (userData && otherUser) {
        const otherName = otherUser.displayName;
        const amount = userData.relationships[otherUID];
        const positiveAmount = amount > 0;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Balance With {otherName}</Text>
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
