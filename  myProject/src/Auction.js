import { Component } from './framework';


import { bindAll} from './utils';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateBid from './components/СreateBid'

class Auction extends Component {
  constructor() {
    super();

    this.state = {
     
    };

    bindAll(
      this,
     
    );
    this.header = new Header();
    this.createBid = new CreateBid();
    this.footer = new Footer();
    this.host = document.createElement('div');
    this.host.classList.add('application-container');
    this.main = document.createElement('main');
		this.main.classList.add('main');

    
  }
  

  render() {
    this.main.append(this.createBid.update());
    const toRender = [
    
      this.header.update(),
      this.main,
      this.footer.update()
    ];

  

    return toRender;
  }
}

export default App;
