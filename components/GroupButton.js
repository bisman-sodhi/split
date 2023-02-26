import {React, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, TouchableHighlight} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';

const GroupButton = ({group, ...rest}) => {
  return (
    <TouchableOpacity style={styles.colorButtonContainer} {...rest}>
      <Text style={styles.buttonText}>{group.groupName}</Text>
    </TouchableOpacity>
  );
};

export default GroupButton;

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