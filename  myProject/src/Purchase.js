import { Component } from './framework';


import { bindAll} from './utils';
import Header from './components/Header';
import FormPur from './components/FormPur';
import Footer from './components/Footer';
export default class Purchase extends Component {
	constructor(props) {
		super(props);

		this.host = document.createElement('div');
		this.host.classList.add('login__container');

		this.header = new Header();
		this.formPur = new FormPur();
		this.footer = new Footer();

		this.main = document.createElement('main');
		this.main.classList.add('main');
	}

	render() {
		this.main.append(this.formPur.update());

		return [
			this.header.update(),
			this.main,
			this.footer.update(),
		];
	}
}