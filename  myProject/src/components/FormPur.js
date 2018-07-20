import { Component } from '../framework';
import { toHtml } from '../utils';
import './buy.css'
export default class FormPur extends Component {
	constructor(props) {
		super(props);

		this.host = document.createElement('div');
		this.host.classList.add('login-form__container');
	}

	render() {
	
	
        const f = `
        <label for="name" class="pay-label">
            <strong>Full name:</strong> 
            <input type="text" id="name" name="user-name" class="pay-input" placeholder="Mathieu Mayer" pattern="^[A-Za-z\s\.-]+$" required="">
          </label>

        <div class="autorisation">
            <label for="email" class="pay-label">
              <strong>Email adress:</strong> 
              <input type="email" id="email" name="user_email" class="pay-input" placeholder="mathieu.mm@me.com" required="" pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$">
            </label>
            <label for="pwd" class="pay-label">
                <strong>Choose a password:</strong> 
                <input type="password" id="pwd" name="user_pwd" class="pay-input" placeholder=" " required="" minlength="5">
                </label>
            </div> 
            <div class="flex-bottom"> 
        </div>

        <div class="card-details">
        <label for="card-number"><strong>Card number:</strong>
            <input type="number" id="card-number" name="cardnumber" required="" min="10000000000" placeholder=" ">
        </label>
        <label for="card-date"><strong>Expiry date:</strong>
            <input type="text" id="card-date" name="expiration" placeholder="DD/MM/YY" required="" pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])[- /\.](0[1-9]|1[012])[/ -\.][0-9]{2}">
        </label>
        <label for="card-code"><strong>Code:</strong>
            <input type="number" id="card-code" name="codenumber" required="" min="100" max="999" placeholder=" ">
        </label>
    </div>      
    </div>
    <div class="flex-end">
        <label for="agree">I agree to the <a href="#">Terms & Conditions</a></label>
        <input type="checkbox" name="agree" id="agree" value="0">
        <button class="button button_green">Place order</button>
        <button class="button button_bordered">Print a quote</button>
    </div>
    </div>
		`;
const form = toHtml(f);
		return form
		
	}
}