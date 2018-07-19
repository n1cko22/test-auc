import { Component } from '../framework';
export default class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bets: null,
		};

		this.host = document.createElement('div');
		this.host.classList.add('list__container');

		this.getBets();

		
		
		//this.timers = new Map();
	}


	render() {
		const { pizzas } = this.state;

		if (!pizzas) return `
			<p class="message--success">
				Loading...
			</p>`;

		if (!pizzas.length) return `
			<p class="message--success">
				Pizza queue is empty
			</p>
		`;

		return bets.map((bets, i) => {
		
			const html = `
				<article class="list__item">
					<img
						src="" 
						alt="pizza" 
						class="item__pic" 
						crossOrigin
					>
					
					<h3 class="item__number-in-queue">
						#${i + 1}
					</h3>
					<div id="timer"></div>
					<span class="item__price">
						$${bet.price}
					</span>
				</article>
			`;

			const fragment = parseHTML(html);
			fragment.getElementById('timer').append(timer.update());

			return fragment;
		});
	}
}