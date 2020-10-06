import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBfv4X1xAN1dFhY-itkhHbJv16N1v8MWC0",
	authDomain: "shopylistio.firebaseapp.com",
	databaseURL: "https://shopylistio.firebaseio.com",
	projectId: "shopylistio",
	storageBucket: "shopylistio.appspot.com",
	messagingSenderId: "55660796852",
	appId: "1:55660796852:web:32345f7928ea9febfb70e1",
	measurementId: "G-L3Y2K2998R"
};

firebase.initializeApp(firebaseConfig);

(window as any).firebase = firebase;

firebase.firestore().enablePersistence()

export const fire 	= firebase;
export const db 	= firebase.firestore();
export const auth 	= firebase.auth();