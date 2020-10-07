import React from "react";
import List from "../components/List";
import { add } from "ionicons/icons";
import {
	IonContent,
	IonMenu,
	IonSearchbar,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonFab,
	IonFabButton,
	IonIcon,
	IonAlert,
	IonAvatar,
	IonImg,
	IonRippleEffect,
} from "@ionic/react";
import { auth, db, fire } from "../firebase";

interface IState {
	alert: boolean;
	modal: boolean;
	uid: string;
	avatarImg: string;
	displayName: string;
	cart: string;
	addAlert: boolean;
	addCartAlert: boolean;
}

class Home extends React.Component<{}, IState> {
	constructor(props) {
		super(props);

		this.state = {
			alert: false,
			modal: false,
			uid: "",
			avatarImg: "",
			displayName: "",
			cart: "",
			addAlert: false,
			addCartAlert: false,
		};

		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					uid: user.uid,
					avatarImg: user.photoURL,
					displayName: user.displayName,
				});

				db.collection("users")
					.where("uid", "==", user.uid)
					.onSnapshot((docs) => {
						docs.forEach((doc) => {
							if (doc.data().cart == "0") {
								this.createCart()
							}
							this.setState({ cart: doc.data().cart });
						});
					});



			} else {
				location.href = "#/login";
			}
		});
	}

	createCart() {
		const id = Math.round(Math.random() * 100000);
		console.log(id);

		const uid = this.state.uid;

		db.collection("carts").add({
			owner: this.state.uid,
			id: id,
		});

		db.collection("users")
			.where("uid", "==", uid)
			.get()
			.then((docs) => {
				docs.forEach((doc) => {
					db.collection("users").doc(doc.id).update({
						cart: id,
					});
				});
			});

		this.setState({ alert: true, cart: id.toString() });
	}

	addItem(Item) {
		const color = () => {
			var ran = Math.round(Math.random() * 5);

			if (ran == 1) {
				return "danger";
			} else if (ran == 2) {
				return "secondary";
			} else if (ran == 3) {
				return "success";
			} else if (ran == 4) {
				return "warning";
			} else if (ran == 5) {
				return "primary";
			}

			if (ran + 1 == 6) {
				ran = 0;
			} else {
				ran++;
			}
		};
		console.log("Added!", Item);
		this.setState({ addAlert: false });

		db.collection("carts").where("id", "==", this.state.cart).get().then((docs) => {
			docs.forEach((doc) => {
				db.collection("carts").doc(doc.id).collection("items").add({
					name: Item,
					date: new fire.firestore.Timestamp(1, 1),
					color: color(),
					user: this.state.displayName,
					checked: false,
					uid: this.state.uid,
				});
			});
		});
	}

	render() {
		return (
			<IonContent>
				<IonMenu contentId="main">
					<IonContent color="dark">
						<IonItem color="dark">
							<IonAvatar slot="start">
								<IonImg src={this.state.avatarImg} />
							</IonAvatar>

							<IonLabel>{this.state.displayName}</IonLabel>
						</IonItem>

						<IonItem color="dark">
							<IonLabel>Cart Id: {this.state.cart}</IonLabel>
						</IonItem>

						<IonItemDivider color="dark" />

						<IonItem
							className="ion-activatable ripple-parent"
							color="dark"
							onClick={(_) => {
								this.setState({ addCartAlert: true });
							}}
						>
							<IonIcon icon={add} slot="start" />
							<IonLabel>Set a Shopping Cart</IonLabel>
							<IonRippleEffect />
						</IonItem>

						<IonItemDivider color="dark" />

						<IonItem
							onClick={(_) => this.createCart()}
							className="ion-activatable ripple-parent"
							color="dark"
						>
							<IonIcon icon={add} slot="start" />
							<IonLabel>Create a Shopping Cart</IonLabel>
							<IonRippleEffect />
						</IonItem>
					</IonContent>
				</IonMenu>

				<IonContent className="bg" id="main">
					<IonSearchbar color="dark" />

					<h1>Shopping List:</h1>

					<List cartId={this.state.cart} />

					<IonFab
						vertical="bottom"
						horizontal="end"
						style={{
							position: "fixed",
						}}
					>
						<IonFabButton
							color="danger"
							onClick={(_) => this.setState({ addAlert: true })}
						>
							<IonIcon icon={add} />
						</IonFabButton>
					</IonFab>

					{/* Alerts */}

					<IonAlert
						isOpen={this.state.addCartAlert}
						header="Cart Id:"
						inputs={[
							{
								name: "cart",
								type: "number",
								placeholder: "Cart Id...",
							},
						]}
						buttons={[
							{
								text: "Cancel",
								handler: (_) => {
									this.setState({ addCartAlert: false });
								},
							},
							{
								text: "Add",
								handler: (p) => {
									console.log(p);
									db.collection("users")
										.where("uid", "==", this.state.uid)
										.get()
										.then((docs) => {
											docs.forEach((doc) => {
												db.collection("users")
													.doc(doc.id)
													.update({
														cart: parseInt(p.cart),
													});
											});
										});

									this.setState({ cart: p.cart })
								},
							},
						]}
						onDidDismiss={(_) => {
							this.setState({ addCartAlert: false });
						}}
					></IonAlert>

					<IonAlert
						isOpen={this.state.alert}
						message={this.state.cart}
						header="Your new cart Id:"
						onDidDismiss={(_) => this.setState({ alert: false })}
					/>

					<IonAlert
						isOpen={this.state.addAlert}
						header="Add a new Item"
						onDidDismiss={(_) => this.setState({ addAlert: false })}
						inputs={[
							{
								name: "Item",
								type: "text",
								placeholder: "Item Name",
							},
						]}
						buttons={[
							{
								text: "Cancel",
								handler: (_) =>
									this.setState({ addAlert: false }),
							},
							{
								text: "Add",
								handler: ({ Item }) => this.addItem(Item),
							},
						]}
					/>
				</IonContent>
			</IonContent>
		);
	}
}

export default Home;
