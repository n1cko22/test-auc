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
        <img src="https://img1.moyo.ua/img/products/3828/83_1500x_1505364451.jpg" />
        </div>
        <div>
        <img src="https://www.bhphotovideo.com/images/images2500x2500/samsung_sm_g960uzkaxaa_samsung_galaxy_s9_1394702.jpg"/>
        </div>
         <div>
         <img src="https://www.passportauto.com/assets/stock/colormatched_01/white/640/cc_2018tos110001_01_640/cc_2018tos110001_01_640_1d6.jpg" />
        </div>
        <div>
        <img src="https://besrefreshments.com/wp-content/uploads/2017/02/beverages5.jpg"/>
      </div>
     <div>
      <img src="https://my.citrus.ua/imgcache/size_1000/uploads/shop/9/f/9f3728617fc6b9bd0acae80c57ee987b.jpg" />
      </div>
      <div>
        <img src="https://gloimg.rglcdn.com/rosegal/pdm-provider-img/straight-product-img/20171226/T010666/T0106660065/goods-img/1514317216487549520.jpg" />
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