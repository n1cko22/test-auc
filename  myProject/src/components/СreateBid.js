import { Component } from '../framework';
import { toHtml } from '../utils';
import {getBase64Image} from './service/AuthService'
import {storeData} from './service/AuthService'
import { itemStore} from './service/AuthService'
import './create.css'
export default class CreateBid extends Component {
	constructor(props) {
		super(props);

		this.host = document.createElement('div');
		this.host.classList.add('login-form__container');

		this.host.addEventListener('submit', ev => this.handleSubmit(ev));
        this.banImg = document.getElementById('bannerImg');
        this.result = document.getElementById('res');
        this.img = document.getElementById('tableBanner');
        
	
    }
  
    handleSubmit(ev) {
        ev.preventDefault();
            const bidData = {
                betname: ev.target.betname.value,
                description: ev.target.decription.value,
                price: ev.target.price.value,
                file: this.saveTo(ev.target.bannerImg.files[0])
               
            };  
            console.log(bidData.file)
     localStorage.clear()
            return storeData(bidData,itemStore)
        }

        saveTo(image) {
            let file = image
            let fReader = new FileReader();
            let img = document.getElementById('tableBanner');
            return new Promise((resolve) => {
                fReader.onload = function() {
                    img.src = fReader.result;
                    console.log(img)
                    resolve(getBase64Image(img));
                    localStorage.setItem("imgData", getBase64Image(img));
            };
                    fReader.readAsDataURL(file);
            })
        }
     
         
    render(){

    const form = `
    <div class ='wrapper-form'>
        <form class="bet-form" method="post">
        <div class = 'wrapp-create'>
		    <label for="betname">Item Name</label>
		    <input type="text" class="bet-form__name" name="betname" id="betname" required>
		    <label for="description">Description</label>
		    <input type="decription" class="decription-form" name="decription" id="decription" required>
		    <label for="start">Price</label>
		    <input type="price" class="price-form__start" name="price" id="price" required>
            <input type="file" id="bannerImg"/>
            <a href="#/auction" class="button--reset">Cancel</a>
            <input type="submit" class="button create__button create__button--submit"  value="Create Bid">
        </div>
        <div class="wrapper-img">
            <img src="" id="tableBanner" />
            <div id="res"></div>     
        </div>
        
         </form>
    </div>
    
        `;
        
    return [
        toHtml(form),   
    ]
    
    
    }
}