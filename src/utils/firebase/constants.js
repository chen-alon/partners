// firebase NATIVE App config (created in firebase console native apps):

// from firebase console and also saved in `android/app/google-services.json`
const CONFIG_ANDROID = {
  apiKey: 'AIzaSyAuD9ks-5V0k8cWULtri5LNpc3MpP6L1hs',
  authDomain: 'partner-f74cb.firebaseapp.com',
  databaseURL: 'https://partner-f74cb.firebaseio.com',
  projectId: 'partner-f74cb',
  storageBucket: 'partner-f74cb.appspot.com',
  messagingSenderId: '276035857295',
  appId: '1:276035857295:web:7577ae19b1c833313679fa',
  measurementId: 'G-7N3KY4B8MJ',
  persistence: true,
};

// app name for react-native-firebase to initializeApp
const FIREBASE_APP_NAME = 'partners';

// collections the we will download from firebase and store in local db
const COLLECTIONS = ['users'];

export {FIREBASE_APP_NAME, COLLECTIONS, CONFIG_ANDROID};
