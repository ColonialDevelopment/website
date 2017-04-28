import {Component} from 'react';
import {ANNOUNCEMENTS_URL} from '../../statics/urls';
import AnnouncementForm from './AnnouncementForm';

class StaffDashboard extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<AnnouncementForm url={ANNOUNCEMENTS_URL} />
		)
	}
}

export default StaffDashboard;