import React, {useContext, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { collection, onShapShot} from 'firebase/firestore'
import { firestore } from '../firebase_setup/firebase.js'

export default function People({navigation}){
    const [people, setPeople] = useState()
    const [loading, setLoading] = useState(false)
    const {People} = useContext(AuthContext);

    useEffect(() => {
        setLoading(true)
        const usersQuery = collection(db, "users")
        onSnapshot(usersQuery, (snapshot) => {
          let usersList = []
          snapshot.docs.map((doc) => usersList.push({ ...doc.data(), id: doc.id }))
          setPeople(usersList)
          setLoading(false)
        })
      }, [])
      const renderItem = ({ item }) => (
        <View style={{ marginTop: 10 }}>
          <Text>{item.username}</Text>
          <DeleteUser id={item.id} />
        </View>
      )
    
      return (
        <View style={styles.container}>
          <Text>Firebase Example</Text>
          <CreateUser />
          <FlatList
            data={people}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
      },
    })

