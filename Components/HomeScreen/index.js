import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

import Header from '../Header';
import NotesList from '../NotesList';

PushNotification.configure({
  onAction: function (notification) {
    PushNotification.deleteChannel(notification.channelId);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

export default function HomeScreen({navigation}) {
  const [storageData, setStorageData] = useState([]);
  const [appData, setAppData] = useState([]);
  const getStorageData = async () => {
    try {
      // first I'm reaching for array of keys used in asyncstorage
      const jsonValue = await AsyncStorage.getItem('@Storage_Data');
      if (jsonValue != null) {
        jsonObject = JSON.parse(jsonValue);
        setStorageData(jsonObject);
        // getIds stores all keys used in asyncstorage
        try {
          const getIds = jsonObject.map(item => {
            return item.id;
          });
          let getAppData = await AsyncStorage.multiGet(getIds);
          setAppData(
            getAppData.map(item => {
              if (item[1] != null) {
                return JSON.parse(item[1]);
              }
            }),
          );
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getStorageData();
  }, []);

  return (
    <View>
      <Header
        title="My reminders:"
        action={true}
        appData={appData}
        setAppData={setAppData}
        navigation={navigation}
        storageData={storageData}
        setStorageData={setStorageData}
      />
      <NotesList appData={appData} setAppData={setAppData} />
    </View>
  );
}
