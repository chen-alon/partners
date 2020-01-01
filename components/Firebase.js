import * as firebase from 'firebase';
import 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: 'AIzaSyAuD9ks-5V0k8cWULtri5LNpc3MpP6L1hs',
  authDomain: 'partner-f74cb.firebaseapp.com',
  databaseURL: 'https://partner-f74cb.firebaseio.com',
  projectId: 'partner-f74cb',
  storageBucket: 'partner-f74cb.appspot.com',
  messagingSenderId: '276035857295',
  appId: '1:276035857295:web:7577ae19b1c833313679fa',
  measurementId: 'G-7N3KY4B8MJ',
};

firebase.initializeApp(config);
const secondFirebaseInstance = firebase.initializeApp(
  config,
  'second_instance',
);

//firebase.firestore().settings(settings);

export default firebase;
export {secondFirebaseInstance};
