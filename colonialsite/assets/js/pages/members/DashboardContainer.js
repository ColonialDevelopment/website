import {Component} from 'react';
import MemberList from './MemberList';

class DashboardContainer extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<div className="col-md-4">
					<MemberList url='/api/members' />
				</div>
				<div className="col-md-4">
					<h2>Announcements</h2>
				</div>
			</div>
		)
	}
}

export default DashboardContainer;