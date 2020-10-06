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
			cart: '',
			addAlert: false
		};

		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					uid: user.uid,
					avatarImg: user.photoURL,
					displayName: user.displayName,
				});

				db.collection('users').where("uid", "==", user.uid).onSnapshot(docs => {
					docs.forEach(doc => {
						this.setState({ cart: doc.data().cart })
					})
				})

			} else {
				location.href = "#/login";
			}
		});
	}

	createCart() {

		const id = Math.round(Math.random() * 100000)
		console.log(id)

		const uid = this.state.uid

		console.log(uid)

		db.collection("carts").add({
			owner: this.state.uid,
			id: id
		})

		db.collection("users").where("uid", "==", uid).get().then(docs => {
			docs.forEach(doc => {
				db.collection('users').doc(doc.id).update({
					cart: id
				})
			})
		})

		this.setState({ alert: true, cart: id.toString() })
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

						<IonItemDivider color="dark" />

						<IonItem

							className="ion-activatable ripple-parent"
							color="dark">
							<IonIcon icon={add} slot="start" />
							<IonLabel>Add a Shopping Cart</IonLabel>
							<IonRippleEffect />
						</IonItem>

						<IonItemDivider color="dark" />

						<IonItem
							onClick={_ => this.createCart()}
							className="ion-activatable ripple-parent"
							color="dark">
							<IonIcon icon={add} slot="start" />
							<IonLabel>Create a Shopping Cart</IonLabel>
							<IonRippleEffect />
						</IonItem>

					</IonContent>
				</IonMenu>

				<IonContent className="bg" id="main">
					<IonSearchbar color="dark" />

					<h1>Shopping List:</h1>
					<h2>Cart Id: {this.state.cart} </h2>

					<List cartId={this.state.cart} />

					<IonFab vertical="bottom" horizontal="end" style={{
						position: 'fixed'
					}} >
						<IonFabButton
							color="danger"
							onClick={(_) => this.setState({ addAlert: true })}
						>
							<IonIcon icon={add} />
						</IonFabButton>
					</IonFab>

					<IonAlert isOpen={this.state.alert} message={this.state.cart} header="Your new cart Id:" />

					<IonAlert isOpen={this.state.addAlert} header="Add a new Item" inputs={[
						{
							name: 'Item',
							type: 'text',
							placeholder: 'Item Name'
						}
					]} buttons={[
						{
							text: 'Cancel',
							handler: _ => this.setState({ addAlert: false })
						},
						{
							text: 'Add',
							handler: ({ Item }) => {
								console.log('Added!', Item)
								this.setState({ addAlert: false })

								db.collection('carts').where("id", "==", this.state.cart).get().then(docs => {
									docs.forEach(doc => {
										db.collection('carts').doc(doc.id).collection('items').add({
											name: Item,
											date: new fire.firestore.Timestamp(1,1),
											user: this.state.displayName,
											checked: false
										})
									})
								})
							}
						}
					]} />

				</IonContent>
			</IonContent>
		);
	}
}

export default Home;
