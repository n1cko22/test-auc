import { Component } from '../framework';
import { toHtml } from '../utils';
//
//import Message from './Message';
//import AUTH_SERVICE from '../service/AuthService'
export default class Contact extends Component {
	constructor(props) {
		super(props);

		this.host = document.createElement('div');
		this.host.classList.add('contact-form__container');

		//this.message = new Message();
	}



	render() {
		const f = `<iframe
        width="60%"
        height="400"
        frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAulJ782upLgK_Tvrip2rGgzi2BWtFu89o
          &q=EPAM,Kyiv" allowfullscreen>
      </iframe>`;
const form = toHtml(f);
		return [
			form
	
		];
	}
}