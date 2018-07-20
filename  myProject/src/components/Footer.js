import { Component } from '../framework';
import './footer.css'
export default class Footer extends Component {
	constructor(props) {
		super(props);

		this.host = document.createElement('div');
		this.host.classList.add('footer__container');
	}

	render() {
		return `
			<footer class="footer">
			<div class = "wrap">
			<span class="footer__copyright">EPAM Systems&copy; 2018</span>
				<address class="footer__address">
					some street 1,
					<a href="tel:5778887">tel. 57-788-87</a>
				</address>
				<div>
				<a href="https://uk-ua.facebook.com/" class="fa fa-facebook"></a>
				 <a href="#" class="fa fa-twitter"></a>
				 </div>
				 </div>
			</footer>
		`;
	}
}