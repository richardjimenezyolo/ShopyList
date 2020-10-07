import React from 'react';
import { IonList, IonItem, IonCheckbox, IonLabel, IonIcon, IonButton } from '@ionic/react';
import { db } from '../firebase';
import { removeSharp } from 'ionicons/icons';

interface Item {
	checked: boolean;
	name: string;
	user: string;
	date: any;
	color: string;
	docId: string;
}

interface IProp {
	cartId: string;
}

interface IState {
	lts: Array<Item>;
	unsub: any;
}

class List extends React.Component<IProp, IState> {

	constructor(props: IProp) {
		super(props)

		this.state = {
			lts: [],
			unsub: _ => { }
		}

		this.loadList()

	}

	componentWillReceiveProps() {
		this.state.unsub()
		this.loadList()
	}

	loadList() {
		if (this.props.cartId != '') {
			var unsub = db.collection('carts').where("id", "==", this.props.cartId).onSnapshot(docs => {

				docs.forEach(doc => {

					db.collection('carts').doc(doc.id).collection('items').onSnapshot(items => {
						this.setState({ lts: [] })
						items.forEach(i => {

							// console.log(i.data())

							var lts = this.state.lts

							var item: Item = {
								checked: i.data().checked,
								date: i.data().date,
								name: i.data().name,
								user: i.data().user,
								color: i.data().color,
								docId: i.id

							}


							lts.push(item)

							this.setState({ lts: lts })
						})
					})
				})
			})
			this.setState({ unsub: unsub })
		} else {
			setTimeout(_ => this.loadList(), 500)
		}
	}

	clickCheck(p, val: Item) {

		const checked = (p.target as any).checked

		// console.log(val)

		db.collection('carts').where("id", "==", this.props.cartId).get().then(docs => {
			docs.forEach(doc => {
				// console.log(doc.data())

				db.collection('carts').doc(doc.id).collection('items').doc(val.docId).update({
					checked: checked
				})

			})
		})
	}

	removeItem(docId: string) {
		db.collection('carts').where("id", "==", this.props.cartId).get().then(docs => {
			docs.forEach(doc => {
				// console.log(doc.data())

				db.collection('carts').doc(doc.id).collection('items').doc(docId).delete()

			})
		})
	}

	render() {

		return (
			<div>
				<IonList>

					{this.state.lts.map((val, idx) => {

						return (
							<div key={idx}>
								<IonList >

									<IonItem color="dark">
										<IonCheckbox
											slot="start"
											checked={val.checked}
											color={val.color}
											mode="ios"
											value="yolo"
											onIonChange={p => this.clickCheck(p, val)}
										/>

										<IonLabel>{val.name}</IonLabel>

										<IonLabel>{val.user}</IonLabel>

										<IonButton fill="outline" color="danger" onClick={_ => this.removeItem(val.docId)} >
											<IonIcon src={removeSharp}/>
										</IonButton>

									</IonItem>

								</IonList>
							</div>
						)
					})}


				</IonList>
			</div>
		)
	}
}

export default List;