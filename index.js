/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

if (Platform.OS == 'android') {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}

AppRegistry.registerComponent(appName, () => App);
