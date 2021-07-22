import PushNotification from 'react-native-push-notification';

export default function setNotification(
  dateFrom,
  title,
  text,
  id,
  ongoing,
  instant,
  completeButton
) {
  let complete;
  if(completeButton){
    complete = ["Dismiss"]
  } else{
    complete = []
  }
  PushNotification.createChannel({
    channelId: 'channel-@' + id, 
    channelName: 'My channel', 
  });
  if (instant) {
    PushNotification.localNotificationSchedule({
      id: parseInt(id, 10).toString(),
      channelId: 'channel-@' + id,
      title: title,
      message: text,
      ongoing: ongoing,
      date: new Date(dateFrom),
      allowWhileIdle: true,
      actions: complete,
      playSound: true,
      invokeApp: false,
      autoCancel: false,
    });
  } else {
    PushNotification.localNotification({
      id: parseInt(id, 10).toString(),
      channelId: 'channel-@' + id,
      title: title,
      message: text,
      ongoing: ongoing,
      allowWhileIdle: true,
      actions: complete,
      playSound: false,
      invokeApp: false,
      autoCancel: false,
    });
  }
}
