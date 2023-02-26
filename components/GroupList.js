import GroupButton from './GroupButton';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import { useState } from "react";

export default function GroupList({navigation, groups}){
    return (
    <View >
        {groups?.length ===0 ? (
    <Text textAlign="center" fontSize="xl">
        No groups...</Text>
    ) : (                                                                
        groups?.map((group) => <GroupButton group={group} onPress={() => {navigation.navigate('GroupPage', {groupID: group.id})}}/>)
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
    },
  });