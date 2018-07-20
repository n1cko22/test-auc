import { Component } from '../framework';
import { toHtml, bindAll } from '../utils';
import './list.css'

export default class List extends Component {
	constructor(props) {
        super(props);
        this.state = {
			bets: null,
			paginate: null,
		};
        this.host = document.createElement('div');
		this.host.classList.add('list__container');
		this.host.addEventListener('submit', ev => this.handleSubmit(ev));
        bindAll(this)
        this.getBets();
		
	}


	getBets() {
        let itemStorage
        let fList = localStorage.getItem('itemStorage')
        if(fList !== undefined){
         itemStorage = JSON.parse(fList)
       
        }
		this.updateState({ bets: itemStorage });  
	 
        
	}

    render() {
		const { bets } = this.state;
        console.log(localStorage)
		if (!bets) return `
			<p class="message--success">
				Loading...
			</p>`;

		if (!bets.length) return `
			<p class="message--success">
				List is empty
			</p>
		`;

		let betHtml= bets.map((bet, i) => {
			let img = "https://img1.moyo.ua/img/products/3828/83_1500x_1505364451.jpg"
		if(bet.file[0] !== undefined){
			
			if(bet.file[0] !== 'data:,'){
				img = "data:image/png;base64,"+bet.file[0]
			} 
			
			const html = `
			<article class="list__item">
				<div class="wrapp-data">	
					<h3 class="id">
						#${i + 1}
					</h3>
					<span class="item__price">
					Name: ${bet.betname}
                    </span>
                    <span class="item__price">
					Description${bet.description}
                    </span>
                    <span class="item__price">
					Price in USD: ${bet.price}
                    </span>
					<a class="buy" href="#/buy">Buy NOW!</a>
				</div>
				<div class="wrapp-img">
					<img src="${img}" class="item__pic">
				</div>
			</article>
			`;
			const fragment = toHtml(html);
			return fragment;
		}
		});
		return betHtml
	}
}
