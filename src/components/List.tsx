import React from 'react';
import { IonList, IonItem, IonCheckbox, IonLabel } from '@ionic/react';
import { db } from '../firebase';

interface Item {
	checked: boolean;
	name: string;
	user: string;
	date: any;
}

interface IProp {
	cartId: string;
}

interface IState {
	lts: Array<Item>;
}

class List extends React.Component<IProp, IState> {

	constructor(props: IProp) {
		super(props)

		this.state = {
			lts: []
		}

		this.loadList()

	}

	loadList() {
		if (this.props.cartId != '') {
			console.log("loading List:", this.props.cartId)
			db.collection('carts').where("id", "==", this.props.cartId).onSnapshot(docs => {


				docs.forEach(doc => {

					db.collection('carts').doc(doc.id).collection('items').onSnapshot(items => {
						this.setState({ lts: [] })
						items.forEach(i => {

							console.log(i.data())

							var lts = this.state.lts

							var item: Item = {
								checked: i.data().checked,
								date: i.data().date,
								name: i.data().name,
								user: i.data().user

							}


							lts.push(item)

							this.setState({ lts: lts })
						})
					})
				})
			})
		} else {
			setTimeout(_ => this.loadList(), 500)
		}
	}

	render() {

		return (
			<div>
				<IonList>

					{this.state.lts.map((val, idx) => {


						const color = () => {

							var ran = Math.round(Math.random() * 5)



							if (ran == 1) {
								return 'primary'
							} else if (ran == 2) {
								return 'secondary'
							} else if (ran == 3) {
								return 'success'
							} else if (ran == 4) {
								return 'warning'
							} else if (ran == 5) {
								return 'danger'
							}

							if (ran + 1 == 6) {
								ran = 0
							} else {
								ran++
							}

						}



						return (
							<div key={idx}>
								<IonList >

									<IonItem color="dark">
										<IonCheckbox
											slot="start"
											checked={val.checked}
											color={color()}
											mode="ios"
										/>

										<IonLabel>{val.name}</IonLabel>

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