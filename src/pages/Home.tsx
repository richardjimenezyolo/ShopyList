import React from "react";
import List from "../components/List";
import { add } from "ionicons/icons";
import {
	IonApp,
	IonContent,
	IonMenu,
	IonSearchbar,
	IonCheckbox,
	IonList,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonFab,
	IonFabButton,
	IonIcon,
	IonModal,
	IonButton,
	IonAvatar,
	IonImg,
} from "@ionic/react";
import { auth, db } from "../firebase";

interface IState {
	modal: boolean;
}

class Home extends React.Component<{}, IState> {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
		};

		auth.onAuthStateChanged((user) => {
			if (user) {
				console.log(user);
			} else {
				location.href = "#/login";
			}
		});
	}

	render() {
		return (
			<IonContent color="dark">
				<IonMenu contentId="main">
					<IonContent color="dark">
						<IonList>
							<IonItem color="dark">
								<IonAvatar slot="start">
									<IonImg />
								</IonAvatar>
							</IonItem>
						</IonList>
					</IonContent>
				</IonMenu>

				<IonContent className="bg" id="main">
					<IonSearchbar color="dark" />

					<h1>Shopping List:</h1>

					<List />

					<IonFab vertical="bottom" horizontal="end">
						<IonFabButton
							color="danger"
							onClick={(_) => this.setState({ modal: true })}
						>
							<IonIcon icon={add} />
						</IonFabButton>
					</IonFab>
				</IonContent>
			</IonContent>
		);
	}
}

export default Home;
