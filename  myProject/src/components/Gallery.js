import { Component } from '../framework';
import { toHtml, bindAll } from '../utils';

export default class Gallery extends Component {
	constructor(props) {
		super(props);
        bindAll(this)
		this.host = document.createElement('div');
		this.host.classList.add('login-form__container');
 
    }
    

	render() {
	
	
		const f = `
        <div class="gallery cf"><div>
        <img src="http://abload.de/img/a6aawu.jpg" />
        </div>
        <div>
        <img src="http://abload.de/img/a6aawu.jpg" />
        </div>
         <div>
         <img src="http://abload.de/img/a6aawu.jpg" />
  </div>
  <div>
    <img src="http://abload.de/img/a6aawu.jpg" />
  </div>
  <div>
    <img src="http://abload.de/img/a6aawu.jpg" />
  </div>
  <div>
    <img src="http://abload.de/img/a6aawu.jpg" />
  </div>
</div>
		`;
const form = toHtml(f);
		return [
			form,
			//this.message.update(),
		];
	}
}