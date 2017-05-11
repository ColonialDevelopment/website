import {Component} from 'react';

class Announcement extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const {id, title, start_date, end_date, description, href} = this.props.announcement;
		const human_end_date = moment(end_date).format('LLLL');

		return(
			<div className='announcement-item'>
				<div className='announcement-header'>
				<span style={{float:'left'}}>{title}</span>
				<span style={{float:'right'}}>Display until {human_end_date}</span>
				</div>
				<div className='announcement-body'>
				{description}
				</div>
				<div className='announcement-attachment'>
				<a href={href}>Attached File</a>
				</div>
			</div>

		)
	}
}

export default Announcement; 