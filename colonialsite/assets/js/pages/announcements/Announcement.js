import {Component} from 'react';

class Announcement extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const {id, title, start_date, end_date, description, attachment} = this.props.announcement;
		const human_start_date = moment(start_date).format('LLLL');
		const file = attachment.split('/').length >= 6  ? (<form method="get" action={attachment}>
															<button type="submit" className="btn btn-primary announcement-file">Attached File</button>
														  </form>) 
														: (<div></div>)
		return(
			<div className='announcement-item'>
				<div className='announcement-header'>
				<span style={{float:'left'}}>{title}</span>
				</div>
				<div className='announcement-body'>
				{description}
				</div>
				{file}
			</div>

		)
	}
}

export default Announcement; 