import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { auth, db } from "./firebase";

import "./styles.css";

class App extends React.Component {
	state = {
		modal: false,
		logged: false,
		uid: "",
		family: "",
	};

	constructor(props) {
		super(props);

		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const docs = await db
					.collection("users")
					.where("uid", "==", user.uid);
				// docs.forEach
				this.setState({ logged: true, uid: user.uid });
			}
		});
	}

	render() {
		if (this.state.logged) {
			return <Home />
		} else {
			return <Login />;
		}
	}
}

export default App;

// return (
// 					<IonApp>
// 						<IonMenu contentId="main">
// 							<IonContent color="dark"></IonContent>
// 						</IonMenu>

// 						<IonContent className="bg" id="main">
// 							<IonSearchbar color="dark" />

// 							<h1>Shopping List:</h1>

// 							<List />

// 							<IonFab vertical="bottom" horizontal="end">
// 								<IonFabButton
// 									color="danger"
// 									onClick={(_) => this.setState({ modal: true })}
// 								>
// 									<IonIcon icon={add} />
// 								</IonFabButton>
// 							</IonFab>

// 						</IonContent>
// 					</IonApp>
// 				);
