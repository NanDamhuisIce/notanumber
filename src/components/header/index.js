import { h, Component } from 'preact';
import './style.css';

export default class Header extends Component {
    
    componentDidMount() {
        window.addEventListener('scroll', this.updateScroll.bind(this), { capture: true, passive: true});
    }
	render() {
		return (
            <header ref={(ref) => this.header = ref}>
                <span id="headerTextOne" class="small">It's</span>
                <span id="headerTextTwo" ref={(ref) => this.headerTextTwo = ref}>NaN</span>
            </header>
		);
    }

    componentDidUpdate() {
        this.transformHeaderText(this.state.scroll);
    }

    transformHeaderText(scroll) {
        const maxMultiplier = 100;
        const step = 3;

        const stepsTaken = Math.floor(scroll/step);
        let shrinkPercentage = stepsTaken < maxMultiplier ? maxMultiplier - stepsTaken : maxMultiplier;
        this.headerTextTwo.style.transform = `scale(${(shrinkPercentage / 100)}) translateY(${shrinkPercentage - (scroll * 1.5)}px)`;
        this.header.style.height = `calc(${shrinkPercentage}vh)`;
    }
 
    updateScroll () {
        this.setState({ scroll:  window.scrollY || window.pageYOffset });
    }
}
