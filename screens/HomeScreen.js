import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import { TouchableOpacity } from 'react-native';
import GroupList from '../components/GroupList';
import UserList from '../components/UserList';
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  where,
  updateDoc,
  whereIn,
} from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import {
  useCollectionData, useDocumentData,
} from "react-firebase-hooks/firestore";
import { getAuth } from "firebase/auth";

function getGroups(uid) {

  const q = query(collection(firestore, "groups"), where('groupIDs', 'array-contains', uid));
  const [groups,isLoading, error] = useCollectionData(q);
  
  if (error) throw error;
  return {groups, isLoading}; 
}

function getUsers() {
  const q = query(collection(firestore, "users"));
  const [users,isLoading, error] = useCollectionData(q);

  if (error) throw error;
  return {users, isLoading}; 
}

const HomeScreen = ({navigation}) => {
  const auth = getAuth();
  console.log(auth.currentUser);
    const {user, logout} = useContext(AuthContext);
    const {groups, isLoading} = getGroups("e5O0TWEqeCNw4nZEpZ5TgueDzpv1");
    const {users, isLoading2} = getUsers();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome User!</Text>  
            <Text style={styles.text}>Groups</Text>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('NewGroup')}>
              <Text style={styles.navButtonText}>Create New Group</Text>
            </TouchableOpacity>
            <GroupList groups={groups} navigation={navigation} />
            <Text style={styles.text}>Users</Text>
            <UserList users={users} navigation={navigation}/>
            {/* <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Relationship', {otherUID: "e5O0TWEqeCNw4nZEpZ5TgueDzpv1"})}>
              <Text style={styles.navButtonText}>Go to Relationship Page</Text>
            </TouchableOpacity> */}
            <FormButton buttonTitle='Logout' onPress={()=> logout()}/>
        </View>
    );
}

export default HomeScreen;

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
    navButton: {
        marginTop: 15,
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
      },
})
