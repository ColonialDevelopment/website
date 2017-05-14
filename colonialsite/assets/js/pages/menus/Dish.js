import {Component} from 'react';
import {ListItem} from 'material-ui';
import Rating from './Rating.js';

class Dish extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<ListItem primaryText={this.props.dish.name} secondaryText={"Average rating: " + this.props.dish.avg_rating + " ("+ this.props.dish.num_ratings + ")"}>
			</ListItem>
			)
	}
}

export default Dish;