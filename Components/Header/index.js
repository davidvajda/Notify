import React from 'react';
import {View} from 'react-native';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
} from '@react-native-firebase/admob';
import {BannerAdSize} from '@react-native-firebase/admob';
import {Appbar} from 'react-native-paper';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1092723526714145/9728281592';

/*
        <View style={styles.ad}>
        
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
  */

export default function Header(props) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
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
  const myDate = new Date();
  const handleAddNote = () => {
    props.navigation.navigate('AddNote', {
      appData: props.appData,
      setAppData: props.setAppData,
      storageData: props.storageData,
      setStorageData: props.setStorageData
    })
  }
  return (
    <View style={{marginBottom: 10}}>
      <Appbar.Header>
        <Appbar.Content
          title={props.title}
          subtitle={
            days[myDate.getDay()].toUpperCase() +
            ', ' +
            myDate.getDate() +
            ' ' +
            months[myDate.getMonth()].toUpperCase()
          }
        />
        {
          props.action
          ? <Appbar.Action icon='plus-circle' onPress={() => handleAddNote()}/>
          : null
        }
      </Appbar.Header>
    </View>
  );
}
