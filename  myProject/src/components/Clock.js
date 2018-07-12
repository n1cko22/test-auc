import { Component } from '../framework';
import { getTime } from '../utils';
export default class Clock extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentTime: getTime(),
		};

		this.host = document.createElement('div');
		this.host.classList.add('clock__container');

		setInterval(() => {
			const currentTime = getTime();
			this.updateState({ currentTime });
		}, 1000);
	}

	render() {
		const { currentTime } = this.state;

		return `
			<i class="fa fa-clock-o"></i>
			<time class="time__current-time" id="current-time">
				${currentTime}
			</time>
		`;
	}
}