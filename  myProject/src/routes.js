import Auction from './App';
import Login from './Login';
import Contact from './Contact'
import Register from './Register'
//import { AUTH_SERVICE } from './service/AuthService';
export default [
  {
		href: '',
		redirectTo: '/',
	},
  {
    href: '/',
    component: Auction,
    //canActivate: AUTH_SERVICE.isAuthorized
  },
  {
    href: '/auction',
    component: Auction,
    //canActivate: AUTH_SERVICE.isAuthorized
  },
  {
    href: '/login',
    component: Login,
  },
  {
    href: '/contacts',
    component: Contact
  },
  {
    href: '/register',
    component: Register,
  },
];
