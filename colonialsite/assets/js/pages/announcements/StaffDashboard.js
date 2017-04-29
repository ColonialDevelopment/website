import {Component} from 'react';
import {ANNOUNCEMENTS_POST} from '../../statics/urls';
import AnnouncementForm from './AnnouncementForm';

class StaffDashboard extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<AnnouncementForm url={ANNOUNCEMENTS_POST} />
		)
	}
}

export default StaffDashboard;