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
} from "@ionic/react";


class Home extends React.Component {
	render() {
		return (
			<IonApp>
				<IonMenu contentId="main">
					<IonContent color="dark"></IonContent>
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
			</IonApp>
		);
	}
}

export default Home;
