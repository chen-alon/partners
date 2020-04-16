import * as firebase from 'firebase';
import 'firebase/firestore';
import {CONFIG_ANDROID} from './constants';

!firebase.apps.length ? firebase.initializeApp(CONFIG_ANDROID) : firebase.app();

// firebase.initializeApp(CONFIG_ANDROID);

export default firebase;
