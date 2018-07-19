import { Component } from '../framework';
import { toHtml } from '../utils';
import {store} from './service/AuthService'
import { logStorage} from './service/AuthService'
//import Message from './Message';
//import AUTH_SERVICE from '../service/AuthService'
export default class RegisterForm extends Component {
	constructor(props) {
		super(props);

		this.host = document.createElement('div');
		this.host.classList.add('login-form__container');

		this.host.addEventListener('submit', ev => this.handleSubmit(ev));

		//this.message = new Message();
	}

	handleSubmit(ev) {
    ev.preventDefault();
    
		const userData = {
			username: ev.target.username.value,
			password: ev.target.password.value,
			password_repeat: ev.target.password_repeat.value,
			email: ev.target.email.value,
			
		};
console.log(localStorage)
		return store(userData, logStorage)
	}

	render() {
		const f = `
		<form class="register-form" method="post">
		<label for="username">Username:</label>
		<input type="text" class="register-form__name" name="username" id="username" required>
		<label for="email">Email:</label>
		<input type="email" class="register-form__email" name="email" id="email" required>
		<label for="password">Password:</label>
		<input type="password" class="register-form__password" name="password"
			id="password" required>
		<label for="password_repeat">Confirm password:</label>
		<input type="password" class="register-form__password" name="password_repeat"
			id="password_repeat" required>

		<input type="submit" class="button register-form__button button--register"
			value="Sign up">
	</form>
		`;
const form = toHtml(f);
		return [
			form,
			//this.message.update(),
		];
	}
}