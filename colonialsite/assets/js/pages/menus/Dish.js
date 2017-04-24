import {Component} from 'react';
import {Panel} from 'react-bootstrap';
import Rating from './Rating.js';

class Dish extends Component {
	constructor(props) {
		super(props);
		this.state={
			editable: this.props.editable,
			ratable: this.props.ratable
		}
	}
	render() {
		return (
			<Panel style={{width:"50vw"}}>
			{this.props.dish.name}
			<Rating your_rating={this.props.dish.rating}	 
					avg_rating={this.props.dish.avg_rating}
					url="/api/ratings/"
					editable={this.props.editable}
					id={this.props.dish.id} />
			</Panel>
			)
	}
}

export default Dish;