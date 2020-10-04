import React from "react";
import { auth } from '../firebase'
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

class Login extends React.Component {
	login() {
		const email = ( document.querySelector("#email") as any ).value;
		const pwd = ( document.querySelector("#pwd") as any ).value;

		auth.signInWithEmailAndPassword(email, pwd).catch(out => {
			alert(out)
		})

	}

	sign() {
		const email = ( document.querySelector("#email") as any ).value;
		const pwd = ( document.querySelector("#pwd") as any ).value;

		auth.createUserWithEmailAndPassword(email, pwd).catch(out => {
			alert(out)
		})
	}

	render() {
		return (
			<IonApp>
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
									<IonInput type="password" id="pwd"/>
								</IonItem>
							</IonList>

							<IonButton color="danger" onClick={this.login}>Login</IonButton>
							<IonButton onClick={this.sign}>Sign Up</IonButton>
						</div>
					</div>
				</IonContent>
			</IonApp>
		);
	}
}

export default Login;
