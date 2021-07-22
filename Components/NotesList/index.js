import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Checkbox, Surface} from 'react-native-paper';

import Options from '../Options';

export default function NotesList(props) {
  const [showOptions, setShowOptions] = useState(false);
  const [optionsData, setOptionsData] = useState();
  const zeroForTime = time => {
    if (time >= 10) {
      return time;
    } else {
      return '0' + time;
    }
  };

  const handleOptions = (text, id, ongoing, completeButton) => {
    setShowOptions(true);
    setOptionsData({
      text: text,
      id: id,
      completeButton: completeButton,
    });
  };

  const setItemAsDeleted = async item => {
    try {
      const jsonValue = JSON.stringify({
        id: item.id,
        deleted: true,
      });
      await AsyncStorage.setItem('@' + item.id, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteItem = parsedItem => {
    props.setAppData(prev => {
      const newAppData = prev.map(item => {
        if (item.id == parsedItem.id) {
          PushNotification.deleteChannel('channel-@' + item.id);
          return {
            id: item.id,
            deleted: true,
          };
        } else {
          return item;
        }
      });
      return newAppData;
    });
    setItemAsDeleted(parsedItem);
  };
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const styleShownTime = date => {
    // this function changes the color of time in reminder's component after it's been after the time in it
    const myDate = new Date();
    if (new Date(date) < myDate) {
      return {color: '#e05548'};
    }
  };

  const renderNotes = props.appData
    .filter(item => item.deleted != true)
    .map(item => {
      const myDate = new Date(item.dateFrom);
      return (
        <Pressable
          style={styles.pressable}
          onLongPress={() =>
            handleOptions(item.text, item.id, item.completeButton)
          }>
          <Surface key={item.id} style={styles.note}>
            <View style={{flexDirection: 'row'}}>
              <Checkbox.Android
                status={item.deleted}
                onPress={() => deleteItem(item)}
              />
              <View style={styles.noteText}>
                <View>
                  <Text style={{fontSize: 16, color: '#505050'}}>
                    {item.text}
                  </Text>
                </View>
              </View>
            </View>
            {item.schedule ? (
              <Text style={[styles.norificationDate, styleShownTime(myDate)]}>
                {myDate.getDate() +
                  'th ' +
                  months[myDate.getMonth()] +
                  ' ' +
                  zeroForTime(myDate.getHours()) +
                  ':' +
                  zeroForTime(myDate.getMinutes())}
              </Text>
            ) : null}
          </Surface>
        </Pressable>
      );
    });
  if (renderNotes.length >= 1) {
    return (
      <View>
        {showOptions ? (
          <Options setShowOptions={setShowOptions} optionsData={optionsData} />
        ) : null}
        <ScrollView>{renderNotes}</ScrollView>
      </View>
    );
  } else {
    return <Text style={styles.noNotes}>Nothing to see here...</Text>;
  }
}

const styles = StyleSheet.create({
  note: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingVertical: 7,

    borderRadius: 5,
    paddingRight: 25,
    elevation: 4,
  },
  noNotes: {
    position: 'absolute',
    fontSize: 20,
    color: '#505050',
    alignSelf: 'center',
    top: Dimensions.get('window').height / 2,
  },
  pressable: {
    flex: 1,
  },
  noteText: {
    justifyContent: 'center',
    flex: 1,
  },
  norificationDate: {
    marginLeft: 35,
    marginTop: 5,
    fontSize: 13,

    color: '#505050'
  }
});
