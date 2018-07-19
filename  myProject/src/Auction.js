import { Component } from './framework';


import { bindAll} from './utils';
import Header from './components/Header';
import Footer from './components/Footer';
import List from './components/List'

class Auction extends Component {
  constructor(props) {
    super(props);

    

    this.header = new Header();
    this.list = new List();
    this.footer = new Footer();
    this.host = document.createElement('div');
    this.host.classList.add('application-container');
    this.main = document.createElement('main');
		this.main.classList.add('main');

    
  }
  

  render() {
  this.main.append(this.list.update());
    const toRender = [
    
      this.header.update(),
    this.main,
      this.footer.update()
    ];

  

    return toRender;
  }
}

export default Auction;
