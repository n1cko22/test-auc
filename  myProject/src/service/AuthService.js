class AuthService {
	constructor() {
		this.data = localStorage.getItem('data') || null;
	
		this.isAuthorized = this.isAuthorized.bind(this.data);
	
	}
    set data(data) {
	
		localStorage.setItem('data', data);
	}

	get data() {
		localStorage.getItem('data', data);
    }
    isAuthorized() {
		return this.dataExsist();
	}

	dataExsist() {
		if (!this.data) return false;
		return true
	}

	logout() {
		this._token = null;
		localStorage.removeItem('token');
		this._claims = null;
		localStorage.removeItem('claims');
	}

	login(credentials) {
		return API_SERVICE.loginUser(credentials)
			.then(response => {
				const { success, token } = response;
				if (success) {
					this.token = token;
					this.claims = parseJwtClaims(token);
					return { success };
					// ^ encapsulating token in login service
				}
				return response;
			});
	}
}

export const AUTH_SERVICE = new AuthService();