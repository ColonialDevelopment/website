import {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Cookies from 'js-cookie';

class Rating extends Component{
	constructor(props){
		super(props);
		this.state={
			rating:this.props.your_rating,
			editable: this.props.editable,
			starColor: ""
		}
	}

	onStarClick(nextValue, prevValue, name){
		var csrftoken = Cookies.get('csrftoken');
		var post_rating=
		{
			dish:this.props.id,
			value:nextValue
		}
		function csrfSafeMethod(method) {
    	// these HTTP methods do not require CSRF protection
   	 	return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
		}
		$.ajaxSetup({
    		beforeSend: function(xhr, settings) {
    			if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            		xhr.setRequestHeader("X-CSRFToken", csrftoken);
        		}
    		}
		});
		$.ajax({
			context:this,
			type:"POST",
			url:this.props.url,
			datatype:'json',

			contentType:'application/json',
			data:JSON.stringify(post_rating)
		})
		.done(function(){
			this.setState({editable:false, rating:event.rating})
		})
		.fail(function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(jqXHR);
			console.log("You have already reviewed this and we messed up")
		})
	}

	render(){
		const { rating } = this.state;
		console.log(this.props.rating);
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