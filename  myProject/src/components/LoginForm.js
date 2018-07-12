import { Component } from '../framework';
import { toHtml } from '../utils';
//
//import Message from './Message';
//import AUTH_SERVICE from '../service/AuthService'
export default class LoginForm extends Component {
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
		};

		return localStorage.getItem(userData)
		
	}

	render() {
		const f = `
<form class="login-form" method="post">
	<label for="username">Username:</label>
	<input type="text" class="login-form__name" name="username" id="username" required>
	<label for="password">Password:</label>
	<input type="password" class="login-form__password" name="password"
		id="password" required>
	<div class="login-form__button-wrapper">
		<input type="submit" class="button login-form__button button--sign-in"
			value="Login">
		<a href="#/register" class="button login-form__button button--sign-up">
			Sign up
		</a>
	</div>
</form>
		`;
const form = toHtml(f);
		return [
			form,
			//this.message.update(),
		];
	}
}