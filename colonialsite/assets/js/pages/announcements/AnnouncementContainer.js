import {Component} from 'react';
import Announcement from './Announcement';

class AnnouncementContainer extends Component{
	constructor(props){
		super(props);
		this.state={
			announcements:[]
		}
	}
	loadContentFromServer(){
		$.ajax({
        	context:this,
            url: this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({announcements:data.results});
            }.bind(this)
        })
	}
	componentDidMount() {
        this.loadContentFromServer();
    }
    render(){
    	if (this.state.announcements.length > 0){
    		var announcements = this.state.announcements.map(function(announcement) {
    			return (<Announcement 	key={announcement.id}
    									announcement={announcement} />)
    		})
		}
    	return (
    		<div className='announcement-container'>
    		{announcements}
    		</div>
		)
    }
}

export default AnnouncementContainer;