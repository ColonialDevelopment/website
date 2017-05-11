import {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Cookies from 'js-cookie';
var axios = require('axios');

class Rating extends Component{
	constructor(props){
		super(props);
		this.state={
			rating:this.props.your_rating,
			editable: this.props.editable,
			rating_id:this.props.rating_id,
			starColor: ""
		}
	}

	onStarClick(nextValue, prevValue, name){
		var csrftoken = Cookies.get('csrftoken');
		var post_or_put_rating=
		{
			dish:this.props.id,
			value:nextValue
		}
		var method = (this.state.rating_id > 0 ? 'put' : 'post');
		var url = (this.state.rating_id > 0 ? '/api/ratings/'+this.state.rating_id+'/' : '/api/ratings/')

		axios({
			context:this,
			method: method,
			url:url,
			headers: { "X-CSRFToken": csrftoken},
			data:post_or_put_rating
		})
		.then(function(response_data){
			this.setState({editable:false, rating:event.rating, rating_id:response_data.data.id})
			this.props.finishSubmit();
		}.bind(this))
		.catch(function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(jqXHR);
			console.log("You have already reviewed this and we messed up")
		})
	}

	render(){
		const { rating } = this.state;
		return (
			<div>
			<div>
			Your Rating:
			<StarRatingComponent
			 	name={"dish-rating-"+this.props.id} 
			 	starCount={5}
			 	value={this.state.rating}
			 	onStarClick={this.onStarClick.bind(this)} 
			 	/>
			 	</div>
			 	<div>
			 Average Rating:
			 <StarRatingComponent
			 	name={"dish-rating-average-"+this.props.id} 
			 	starCount={5}
			 	editable={false}
			 	value={this.props.avg_rating}
			 	/>
			 </div>
			 </div>
		)
	}
}

export default Rating;