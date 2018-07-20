import { Component } from '../framework';
import { toHtml } from '../utils';
import './contact.css'
export default class Contact extends Component {
	constructor(props) {
		super(props);

		this.host = document.createElement('div');
		this.host.classList.add('contact-form__container');
	}

	render() {
		const f = `
		<div class="contact-wrapper">
			<div class="contacts">
				<h2>CONTACT US</h2>
				<a href="tel:5778887"><span>tel.:</span> 57-788-87</a><br>
				<a href="mailto:bet@bet.com"><span>email:</span> bet@bet.com</a>
			</div>
			<iframe width="100%" height="400" frameborder="0" style="border:0"
        		src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAulJ782upLgK_Tvrip2rGgzi2BWtFu89o&q=EPAM,Kyiv" allowfullscreen>
	   		</iframe>
	   	</div>`
	  ;
	  
const form = toHtml(f);
		return form
	}
}