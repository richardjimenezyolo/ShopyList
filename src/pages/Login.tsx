import React from "react";
import { auth, fire } from "../firebase";
import {
	IonApp,
	IonContent,
	IonList,
	IonItem,
	IonInput,
	IonLabel,
	IonItemDivider,
	IonRow,
	IonCol,
	IonGrid,
	IonButton,
} from "@ionic/react";
import { GooglePlus } from "@ionic-native/google-plus";

class Login extends React.Component {
	constructor(props) {
		super(props);

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

			location.href = '#/';
		}

		lo();
	}

	login() {
		const email = (document.querySelector("#email") as any).value;
		const pwd = (document.querySelector("#pwd") as any).value;

		auth.signInWithEmailAndPassword(email, pwd).then(out => {
			location.href = '#/';
		}).catch((out) => {
			alert(out);
		});
	}

	sign() {
		const email = (document.querySelector("#email") as any).value;
		const pwd = (document.querySelector("#pwd") as any).value;

		auth.createUserWithEmailAndPassword(email, pwd).catch((out) => {
			alert(out);
		});
	}

	render() {
		return (
			<IonContent className="bg">
				<div id="loginTitle">
					<h1>ShopyList</h1>
				</div>

				<div id="login">
					<div>
						<h2>Login:</h2>
						<IonList>
							<IonItem color="dark">
								<IonLabel>Email:</IonLabel>
								<IonInput type="email" id="email" />
							</IonItem>

							<IonItemDivider />

							<IonItem color="dark">
								<IonLabel>Password:</IonLabel>
								<IonInput type="password" id="pwd" />
							</IonItem>
						</IonList>

						<IonButton color="danger" onClick={this.login}>
							Login
						</IonButton>
						<IonButton onClick={this.sign}>Sign Up</IonButton>
					</div>
				</div>
			</IonContent>
		);
	}
}

export default Login;
