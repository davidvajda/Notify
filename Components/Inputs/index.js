import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function Inputs(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          props.navigation.navigate('AddNote', {
            appData: props.appData,
            setAppData: props.setAppData,
            storageData: props.storageData,
            setStorageData: props.setStorageData
          })
        }>
        <Text style={styles.buttonText}>New Reminder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: '15%',
    width: '100%'
  },
  button: {
    backgroundColor: '#FFFBAA',

    width: '80%',
    height: 40,
    borderRadius: 15,

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#505050',
    fontSize: 20,
    letterSpacing: 2
  }
})