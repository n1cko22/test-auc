import { Component } from '../framework';
import { toHtml, bindAll } from '../utils';

//import Message from './Message';
//import AUTH_SERVICE from '../service/AuthService'
export default class List extends Component {
	constructor(props) {
        super(props);
        this.state = {
			bets: null,
		};
        this.host = document.createElement('div');
		this.host.classList.add('list__container');
		this.host.addEventListener('submit', ev => this.handleSubmit(ev));
        bindAll(this)
        this.getBets();
		//this.message = new Message();
	}


	getBets() {
        let itemStorage
        let fList = localStorage.getItem('itemStorage')
        if(fList !== undefined){
         itemStorage = JSON.parse(fList)
       
        }
        this.updateState({ bets: itemStorage });      
        
	}
	handleSubmit(ev) {
        ev.preventDefault();
            const bidD = { bidAdd:ev.target.bid0.value}
               
            console.log('ok')
   
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

		return bets.map((bet, i) => {
			const html = `
				<article class="list__item">
					<img src="${"data:image/png;base64,"+bet.file[0]}" class="item__pic">
					<h3 class="id">
						#${i + 1}
					</h3>
					<span class="item__price">
						${bet.betname}
                    </span>
                    <span class="item__price">
						${bet.betname}
                    </span>
                    <span class="item__price">
						${bet.price}
                    </span>
                    <input type="bid" class="bid__password" name="bid${i}" id="bid">
					<input
					type="submit" 
					   class="button create__button 
						   create__button--submit" 
					   value="Create Bid">
				</article>
			`;
			const fragment = toHtml(html);
			return fragment;
		});
	}
}
