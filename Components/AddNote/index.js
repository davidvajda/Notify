import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  LogBox,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Checkbox,
  Surface,
  Button,
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setNotification from '../../functions';
import Header from '../Header';

export default function AddNote({route, navigation}) {
  const {appData, setAppData, storageData, setStorageData} = route.params;
  const [textInput, setTextInput] = useState('');
  const [dateFrom, setDateFrom] = useState(new Date(Date.now() + 3600 * 1000));
  const [persistent, setPersistent] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [completeButton, setCompleteButton] = useState(false);
  const [emptyInput, setEmptyInput] = useState({
    message: '',
    show: false,
  });

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const submitNote = () => {
    if (textInput.length !== 0) {
      setAppData(prev => {
        const newArray = [
          ...prev,
          {
            id: prev.length,
            text: textInput,
            deleted: false,
            persistent: persistent,
            schedule: schedule,
            completeButton: completeButton,
            dateFrom: dateFrom.getTime(),
          },
        ];
        return newArray;
      });
      storeSotrageData();
      storeAppData();
      setNotification(
        dateFrom,
        'Reminder',
        textInput,
        appData.length,
        persistent,
        schedule,
        completeButton,
      );
      navigation.navigate('HomeScreen');
    } else {
      setEmptyInput({
        message: 'The textfield is empty. You need to enter some text.',
        show: true,
      });
    }
  };

  const storeAppData = async () => {
    try {
      const jsonValue = JSON.stringify({
        id: appData.length,
        text: textInput,
        deleted: false,
        persistent: persistent,
        schedule: schedule,
        completeButton: completeButton,
        dateFrom: dateFrom,
      });
      await AsyncStorage.setItem('@' + appData.length, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const storeSotrageData = async () => {
    try {
      setStorageData(prev => {
        const newStorageData = [
          ...prev,
          {
            id: '@' + prev.length,
          },
        ];
        return newStorageData;
      });
      const dataToStore = [...storageData, {id: '@' + storageData.length}];
      const jsonValue = JSON.stringify(dataToStore);
      await AsyncStorage.setItem('@Storage_Data', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  function returnModifiedTime(word, number) {
    const stringNumber = number.toString().split('.')[0];
    if (stringNumber == 1) {
      return stringNumber + ' ' + word + ' ';
    } else if (stringNumber == 0) {
      return '';
    } else {
      return stringNumber + ' ' + word + 's ';
    }
  }

  // display remaining time to launch notification in add button
  const timeLeft = () => {
    let myDate = dateFrom - new Date();
    const getTimeLeft = date => {
      const days = date / (3600 * 1000 * 24);
      const hours = (date % (3600 * 1000 * 24)) / (3600 * 1000);
      const minutes =
        ((date % (3600 * 1000 * 24)) % (3600 * 1000)) / (60 * 1000);

      return (
        <Text style={styles.buttonSubText}>
          {returnModifiedTime('Day', days)}
          {returnModifiedTime('Hour', hours)}
          {returnModifiedTime('Minute', minutes)}
        </Text>
      );
    };
    return getTimeLeft(myDate);
  };

  return (
    <ScrollView style={styles.container}>
      <Header
        style={styles.header}
        action={false}
        title="Create new reminder:"
      />
      <TextInput
        autoFocus={true}
        onChangeText={event => setTextInput(event)}
        mode="outlined"
        label="Your reminder"
        style={styles.textInput}
      />

      <Surface style={styles.optionsContainer}>
        {emptyInput.show ? (
          <Text style={styles.errorMessage}>{emptyInput.message}</Text>
        ) : null}

        <View style={styles.optionContainer}>
          <Checkbox
            status={persistent ? 'checked' : 'unchecked'}
            onPress={() => setPersistent(prev => !prev)}
            textStyle={{textDecorationLine: 'none'}}
          />
          <Text>Set up as persistent reminder</Text>
        </View>

        {persistent ? (
          <View style={styles.optionContainer}>
            <Checkbox
              status={completeButton ? 'checked' : 'unchecked'}
              onPress={() => setCompleteButton(prev => !prev)}
              textStyle={{textDecorationLine: 'none'}}
            />
            <Text>Show dismiss option</Text>
          </View>
        ) : null}

        <View style={styles.optionContainer}>
          <Checkbox
            status={schedule ? 'checked' : 'unchecked'}
            onPress={() => setSchedule(prev => !prev)}
            textStyle={{textDecorationLine: 'none'}}
          />
          <Text>Schedule reminder</Text>
        </View>

        {schedule ? (
          <View>
            <Text style={styles.dateText}>
              Notification will be shown from:
            </Text>
            <DatePicker
              is24hourSource={'device'}
              minuteInterval={5}
              date={new Date(dateFrom)}
              minimumDate={new Date(Date.now())}
              onDateChange={setDateFrom}
              textColor={'#505050'}
              style={styles.datePicker}
            />
          </View>
        ) : null}
      </Surface>

      <View style={styles.buttonWrapper}>
        <Button
          onPress={submitNote}
          icon="bell-plus"
          mode="contained"
          style={styles.button}>
          Create Reminder
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '60%',
    alignSelf: 'center',
    marginTop: 15,
  },
  datePicker: {
    alignSelf: 'center',
  },
  textInput: {
    marginHorizontal: 10,
  },
  optionsContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    elevation: 4,
    padding: 10,
  },
  optionContainer: {
    marginVertical: 2,

    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMessage: {
    color: '#f56f5d',
    fontWeight: '700',
  },
});
