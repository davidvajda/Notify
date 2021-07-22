import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import setNotification from '../../functions';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Options(props) {
  const {setShowOptions, optionsData} = props;
  const myDate = new Date();

  return (
    <Pressable style={styles.wrapper} onPressIn={() => setShowOptions(false)}>
      <Pressable style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setShowOptions(false)}>
          <Icon name="closecircleo" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setNotification(
              myDate,
              'Reminder',
              optionsData.text,
              optionsData.id,
              false,
              false,
              optionsData.completeButton,
            )
          }>
          <Text style={styles.buttonText}>Relaunch notification</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setNotification(
              myDate,
              'Reminder',
              optionsData.text,
              optionsData.id,
              true,
              false,
              optionsData.completeButton,
            )
          }>
          <Text style={styles.buttonText}>
            Relaunch as persistent notification
          </Text>
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',

    zIndex: 99,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  container: {
    position: 'absolute',
    backgroundColor: '#f2f2f2',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    zIndex: 100,

    width: 300,
    paddingVertical: 50,

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 150,
  },
  button: {
    backgroundColor: 'white',

    padding: 15,
    marginVertical: 5,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  closeButton: {
    width: 25,
    height: 25,
    borderRadius: 13,

    backgroundColor: '#ff5757',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    top: 10,
    right: 10,
  },
});
