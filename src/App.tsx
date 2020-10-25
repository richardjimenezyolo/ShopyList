import { hot } from 'react-hot-loader/root';
import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { IonApp, IonRouterOutlet, IonRoute } from "@ionic/react";
import { IonReactHashRouter } from "@ionic/react-router";
import "./styles.css";

class App extends React.Component {
	render() {
		return (
			<IonApp>
				<IonRouterOutlet />
				<IonReactHashRouter>
					<IonRoute
						path="/"
						exact
						render={(p) => {
							return <Home />;
						}}
					/>
					<IonRoute
						path="/login"
						exact
						render={(p) => {
							return <Login />;
						}}
					/>
				</IonReactHashRouter>
			</IonApp>
		);
	}
}

export default hot(App);
