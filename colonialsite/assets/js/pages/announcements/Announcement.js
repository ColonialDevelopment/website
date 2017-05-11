import {Component} from 'react';
import {Panel} from 'react-bootstrap';

class Announcement extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const {id, title, start_date, end_date, description, attachment} = this.props.announcement;
		const human_start_date = moment(start_date).format('LLLL');
		console.log(attachment);
		var file = (<div></div>);
		if (attachment){
			var file = attachment.split('/').length >= 6  ? (<form method="get" action={attachment}>
																<button type="submit" className="btn btn-primary announcement-file">Attached File</button>
										  					 </form>) 
														  : (<div></div>)
		}
		return(
					<Panel	header={<span>
						   			<span>{title}</span>
						   			<span style={{float:'right'}}>{this.props.category}</span>
					   			   </span>} >
	                       <span style={{float:'left'}}> {description} </span><span style={{float:'right'}}>{file}</span>
	                </Panel>
               )
	}
}

export default Announcement; 