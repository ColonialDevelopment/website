import {Component} from 'react';
import {ANNOUNCEMENTS_POST} from '../../statics/urls';
import AnnouncementForm from './AnnouncementForm';
import MealContainer from '../menus/MealContainer';

const findDate = () => {
  let returnString = "";
  const today = new Date();

  returnString = today.getFullYear();

  let month = today.getMonth() + 1 + "";
  if (month.length === 1) month = "0" + month;
  returnString += "-" + month;

  let date = today.getDate() + "";
  if (date.length === 1) date = "0" + date;
  returnString += "-" + date;

  return {date: returnString, day: today.getDay()};
}

class StaffDashboard extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className='container'>
				<div className='col-md-8'>
					<MealContainer today={findDate()}
								   edit={true}/>
					<AnnouncementForm url={ANNOUNCEMENTS_POST} />
				</div>
			</div>
		)
	}
}

export default StaffDashboard;