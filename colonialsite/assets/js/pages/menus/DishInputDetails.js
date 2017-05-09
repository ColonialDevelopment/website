import { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import Cookies from 'js-cookie';
var axios = require('axios');

class DishInputDetails extends Component {
	constructor(props) {
		super(props)
		if (this.props.dish.customOption) {
			this.state = {
				dairy_free: false,
				kosher_halal: false,
				nut_free: false,
				soy_free: false,
				vegan: false,
				vegetarian: false,
				allergens: ''
			}
		} else {
			this.state = {
				dairy_free: this.props.dish.dairy_free,
				kosher_halal: this.props.dish.kosher_halal,
				nut_free: this.props.dish.nut_free,
				soy_free: this.props.dish.soy_free,
				vegan: this.props.dish.vegan,
				vegetarian: this.props.dish.vegetarian,
				allergens: this.props.dish.allergens
			}
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange(event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name

		this.setState({
			[name]: value
		})
	}

	handleSubmit(e) {
		// does some submission stuff
		var type = (this.props.dish.customOption ? 'post' : 'put')
		var url = (this.props.dish.customOption ? '/api/dishes/' : '/api/dishes/'+this.props.dish.id+'/add_dish_to_menu/')
		// ajax call be here
		var csrftoken = Cookies.get('csrftoken');
		var post_dish_data =
		{
			name:this.props.dish.name,
			menus:[this.props.menu_id],
			allergens:this.state.allergens,
			dairy_free:this.state.dairy_free,
			kosher_halal:this.state.kosher_halal,
			nut_free:this.state.nut_free,
			sory_free:this.state.soy_free,
			vegan:this.state.vegan,
			vegetarian:this.state.vegetarian
		}
		var put_dish_data =
		{
			menu:this.props.menu_id
		}
		var post_or_put_dish_data = (this.props.dish.customOption ? post_dish_data : put_dish_data)
		axios({
			method:type,
			url:url,
			responseType:'json',
			headers: { "X-CSRFToken": csrftoken},
			data:post_or_put_dish_data
		})
		.then(function(){ 
			console.log("Dish Added to menu");
		})
		.catch(function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(jqXHR);
			console.log("You have already reviewed this and we messed up")
		})
/*		this.props.finishSubmit();
*/		e.preventDefault()
	}

	render() {
		return (
			<form>
				<div className='form-group'>
					<label className="checkbox-inline">
						<input type='checkbox'
							   checked={this.state.dairy_free}
							   onChange={this.handleInputChange}
							   name={'dairy_free'}
						/> Dairy Free
					</label>
					<label className="checkbox-inline">
						<input type='checkbox'
							   checked={this.state.kosher_halal}
							   onChange={this.handleInputChange}
							   name={'kosher_halal'}
						/> Kosher/Halal
					</label>
					<label className="checkbox-inline">
						<input type='checkbox'
							   checked={this.state.nut_free}
							   onChange={this.handleInputChange}
							   name={'nut_free'}
						/> Nut Free
					</label>
					<label className="checkbox-inline">
						<input type='checkbox'
							   checked={this.state.soy_free}
							   onChange={this.handleInputChange}
							   name={'soy_free'}
						/> Soy Free
					</label>
					<label className="checkbox-inline">
						<input type='checkbox'
							   checked={this.state.vegan}
							   onChange={this.handleInputChange}
							   name={'vegan'}
						/> Vegan
					</label>
					<label className="checkbox-inline">
						<input type='checkbox'
							   checked={this.state.vegetarian}
							   onChange={this.handleInputChange}
							   name={'vegetarian'}
						/> Vegetarian
					</label>
				</div>
				<div>
				Allergens: 
					<input type='text'
						   value={this.state.allergens}
						   className='form-control'
						   name={'allergens'}
						   onChange={this.handleInputChange}
				   	/>
				</div>
				<div>
					Rating: {this.props.dish.avg_rating} from {this.props.dish.num_ratings} ratings.
				</div>
				<div>
					<button type="button"
							className='btn btn-default'
							onClick={this.handleSubmit}
					>
						Submit
					</button>
				</div>
			</form>
		)
	}
}

export default DishInputDetails;