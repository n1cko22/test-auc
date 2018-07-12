import { Component } from '../framework';
export default class CreateBid extends Component {
	constructor(props) {
		super(props);

		this.host = document.createElement('div');
		this.host.classList.add('container');

		
        this.main = document.createElement('main');
		this.main.classList.add('main');
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.host.addEventListener('change', this.handleFormChange);
		this.host.addEventListener('submit', this.handleSubmit);

	
    }
    render(){
        const html = `	<div class="create-pizza__button-wrapper">
        <a 
            href="#/list"
            class="button create-__button 
                create__button--reset" 
        >Cancel</a>
        <input 
            type="submit" 
            class="button create__button 
                create__button--submit" 
            value="Create Bid"
        >
    </div>
</form>
    `
    return toHtml(html)
    }
}