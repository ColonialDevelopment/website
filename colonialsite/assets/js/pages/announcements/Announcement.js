import {Component} from 'react';
import {Panel} from 'react-bootstrap';

class Announcement extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const {id, title, start_date, end_date, description, file_title, attachment} = this.props.announcement;
		const human_start_date = moment(start_date).format('LLLL');
		var file = (<div></div>);
		if (attachment){
			var file = attachment.split('/').length >= 6  ? (<form method="get" action={attachment}>
																<button type="submit" className="btn btn-primary announcement-file">{file_title}</button>
										  					 </form>) 
														  : (<div></div>)
		}
		return(
					<Panel	header={<span>
						   			<span>{title}</span>
						   			<span style={{float:'right'}}>{this.props.category}</span>
					   			   </span>} > 
	                       <div style={{wordBreak:'break-word'}}>
	                       {description}
	                       </div> 
	                       <span style={{float:'right'}}>{file}</span>
	                </Panel>
               )
	}
}

export default Announcement; 