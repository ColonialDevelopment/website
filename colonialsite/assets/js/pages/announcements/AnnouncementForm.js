import {Component} from 'react';
import Cookies from 'js-cookie';
import Datetime from 'react-datetime';

class AnnouncementForm extends Component {
	constructor(props){
		super(props);
		this.state= {
			title:"",
			start_date:null,
			end_date:null,
			description:""
		}
		this.uploadFile = this.uploadFile.bind(this);
	}
	uploadFile(e) {
        var fd = new FormData();    
        fd.append('file', this.refs.file.files[0]);
        fd.append('title', this.state.title);
        fd.append('start_date', this.state.start_date);
        fd.append('end_date', this.state.end_date);
        fd.append('description', this.state.description);

        var csrftoken = Cookies.get('csrftoken');
		function csrfSafeMethod(method) {
    	// these HTTP methods do not require CSRF protection
   	 	return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
		}
		$.ajaxSetup({
    		beforeSend: function(xhr, settings) {
    			if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            		xhr.setRequestHeader("X-CSRFToken", csrftoken);
        		}
    		}
		});
		console.log(this.state);
        $.ajax({
            url: this.props.url,
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                alert("Your announcement has been posted successfully")
            } 
        })
        e.preventDefault()
    }

	render(){
		return (
			<div className="container">
			<div className="h2">
			Make a new Announcement:
			</div>
			<form ref="uploadForm" className="uploader" encType="multipart/form-data" >
           Title:
           <input 		onChange={(e) => this.setState({title:e.target.value})}
           				type="text" className="form-control" />
           Description:
           <textarea 	onChange={(e) => this.setState({description:e.target.value})}
           				className="form-control"/>

           Start Date:
           <Datetime 	onChange={(moment)=>this.setState({start_date:moment.toISOString()})}
           				value={moment(this.state.start_date)}/>
           Expiration Date:
           <Datetime 	onChange={(moment)=>this.setState({end_date:moment.toISOString()})}
           				value={moment(this.state.end_date)}/>          
			Attachments:
                   <input ref="file" type="file" name="file" className="upload-file"/>
                   <br />
                   <input type="button" ref="button" value="Post Announcement" onClick={this.uploadFile} />
           </form>
           </div>

			)
	}
}

export default AnnouncementForm;