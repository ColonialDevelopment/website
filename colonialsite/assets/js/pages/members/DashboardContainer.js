import {Component} from 'react';
import {Image} from 'react-bootstrap';
import MemberList from './MemberList';
import AnnouncementContainer from '../announcements/AnnouncementContainer';
import EventList from '../events/EventList';
import MealContainer from '../menus/MealContainer';
import {EVENTS_LIST} from '../../statics/urls.js';

class DashboardContainer extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<div className='container'>
					<div className='text-center'>
						<img className='dashboard-image img-fluid' src="http://static1.squarespace.com/static/53a0b930e4b0514810c11acf/t/540107ece4b0b0a7e1846be0/1493499456578/?format=1500w" />
						<div className='dashboard-header'>COLONIAL CLUB</div>	
					</div>
					<div className="col-md-6">
						<div className='dashboard-header'>ANNOUNCEMENTS</div>
						<AnnouncementContainer url='/api/announcements' />
					</div>
					<div className="col-md-6">
						<div className='dashboard-header'>EVENTS</div>
						<EventList url={EVENTS_LIST} small={true} pollInterval={100000}/>
					</div>
				</div>
				<div className='dashboard-header'>MENUS</div>
				<div className='container'>
					<MealContainer today={this.props.today}/>
				</div>
			</div>
		)
	}
}

export default DashboardContainer;