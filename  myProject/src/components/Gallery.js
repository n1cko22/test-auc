import { Component } from '../framework';
export default class Slideshow extends Component {
    constructor(props) {
		super(props);
		
		
	}


		init() {
		
			
		}
		_slideTo( slide ) {
			var currentSlide = this.slides[slide];
			currentSlide.style.opacity = 1;
			
			for( var i = 0; i < this.slides.length; i++ ) {
				var slide = this.slides[i];
				if( slide !== currentSlide ) {
					slide.style.opacity = 0;
				}
			}
		}
		action() {
			var self = this;
			self.timer = setInterval(function() {
				self.index++;
				if( self.index == self.slides.length ) {
					self.index = 0;
				}
				self._slideTo( self.index );
				
			}, 3000);
		}
		stopStart() {
			var self = this;
			self.el.addEventListener( "mouseover", function() {
				clearInterval( self.timer );
				self.timer = null;
				
			}, false);
			self.el.addEventListener( "mouseout", function() {
				self.action();
				
			}, false);
        }
        render(){
            this.wrapper = this.el.querySelector( ".slider-wrapper" );
			this.slides = this.el.querySelectorAll( ".slide" );
			this.previous = this.el.querySelector( ".slider-previous" );
			this.next = this.el.querySelector( ".slider-next" );
			this.index = 0;
			this.total = this.slides.length;
			this.timer = null;
			
            this.action();
            this.stopStart();
		const html = `<div class="slider" id="main-slider">
	<div class="slider-wrapper">
		<img src="http://lorempixel.com/1024/400/animals" alt="First" class="slide" />
		<img src="http://lorempixel.com/1024/400/business" alt="Second" class="slide" />
		<img src="http://lorempixel.com/1024/400/city" alt="Third" class="slide" />
	</div>
</div>`
return html
        }	
	};
	
	
	
	

