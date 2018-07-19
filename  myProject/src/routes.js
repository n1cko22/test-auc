import Auction from './Auction';
import AddBid from './AddBid';
import Login from './Login';
import Contact from './Contact'
import Register from './Register'
import GalleryMain from './GalleryMain'
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
    href: '/addbid',
    component: AddBid,
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
  {
    href: '/gallery',
    component: GalleryMain,
  },
];
