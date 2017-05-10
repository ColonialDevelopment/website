import {Component} from 'react';
import {ANNOUNCEMENTS_POST} from '../../statics/urls';
import AnnouncementForm from './AnnouncementForm';

class StaffDashboard extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className='container'>
				<div className='col-md-8'>
					<AnnouncementForm url={ANNOUNCEMENTS_POST} />
				</div>
			</div>
		)
	}
}

export default StaffDashboard;