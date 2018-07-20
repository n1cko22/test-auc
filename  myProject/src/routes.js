import Auction from './Auction';
import AddBid from './AddBid';
import Login from './Login';
import Contact from './Contact'
import Register from './Register'
import GalleryMain from './GalleryMain'
import Purchase from './Purchase'
//import { comp } from './service/AuthService';
export default [
  {
		href: '',
		redirectTo: '/',
	},
  {
    href: '/',
    component: Auction,
    //canActivate: comp.isAuthorized
  },
  {
    href: '/auction',
    component: Auction,
    //canActivate: comp.isAuthorized
  },
  {
    href: '/addbid',
    component: AddBid,
    //canActivate: comp.isAuthorized
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
  {
    href: '/buy',
    component: Purchase,
  },
];
