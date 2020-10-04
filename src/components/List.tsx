import React from 'react';
import { IonList, IonItemDivider, IonItem, IonCheckbox, IonLabel } from '@ionic/react'

interface Item {
	isCheck: boolean;
	name: string
}

interface IProp {
}

interface IState {
	lts: Array<Item>
}

class List extends React.Component<IProp, IState> {

	constructor(props: IProp) {
		super(props)

		console.log(props)

		this.state = {
			lts: []
		}

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
											checked={val.isCheck}
											color="secondary"
											mode="ios"
										/>

										<IonLabel>{ val.name }</IonLabel>
									
									</IonItem>

									<IonItemDivider />
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