import React from "react";
import { auth, fire, db } from "../firebase";
import {
	IonContent,
	IonButton,
} from "@ionic/react";
import { GooglePlus } from "@ionic-native/google-plus";

class Login extends React.Component {
	constructor(props) {
		super(props);

		auth.onAuthStateChanged(user => {
			if (user) {
				console.log('user')
				db.collection('users').add({
					uid: user.uid,
					cart: 0
				})
				location.href = "#/";
			}
		})

		async function lo() {
			const gPlusUser = await GooglePlus.login({
				webClientId:
					"55660796852-07ln9ljan9enncfv9i3qe2rg14t9plf1.apps.googleusercontent.com",
				offline: true,
				scopes: "profile email",
			});

			const credential = await fire.auth.GoogleAuthProvider.credential(
				gPlusUser.idToken
			);

			console.log(credential);



			auth.signInWithCredential(credential);
			console.log('user2')


		}

		lo();
	}

	login() {
		const provider = new fire.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);

	}

	render() {
		return (
			<IonContent className="bg">
				<div id="login">
					<IonButton color="danger" onClick={this.login}>
						Login
					</IonButton>
				</div>
			</IonContent>
		);
	}
}

export default Login;
