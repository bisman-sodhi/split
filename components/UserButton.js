import {React, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, TouchableHighlight} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';

const UserButton = ({user, ...rest}) => {
  // const [myBool, setmyBool] = useState(true);
  // function toggleBool() {
  //   setmyBool(!myBool);
  // }
  return (
    // myBool ?
    <TouchableOpacity style={styles.buttonContainer} {...rest} >
      <Text style={styles.buttonText}>{user.displayName}</Text>
    </TouchableOpacity>
  //   : 
  //   <TouchableOpacity style={styles.colorButtonContainer} {...rest} onPress={() => {toggleBool()}}>
  //   <Text style={styles.buttonText}>{user.email}</Text>
  // </TouchableOpacity>

  );
};

export default UserButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#808080',
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
  colorButtonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#FFB6C1',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
});