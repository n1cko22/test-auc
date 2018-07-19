import { Component } from './framework';


import { bindAll} from './utils';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
export default class GalleryMain extends Component {
	constructor(props) {
		super(props);

		this.host = document.createElement('div');
		this.host.classList.add('login__container');

		this.header = new Header();
		this.gallery = new Gallery();
		this.footer = new Footer();

		this.main = document.createElement('main');
		this.main.classList.add('main');
	}

	render() {
		this.main.append(this.gallery.update());

		return [
			this.header.update(),
			this.main,
			this.footer.update(),
		];
	}
}