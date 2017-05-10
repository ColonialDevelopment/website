import injectTapEventPlugin from 'react-tap-event-plugin';
import {Component} from 'react';
import Cookies from 'js-cookie';

import {Card, CardActions, CardTitle, Dialog, FlatButton, RaisedButton, TimePicker, DatePicker, TextField} from 'material-ui';

function merge_date_time(date, time){

  var momentTime = moment(time);
  var momentDate = moment(date);

  var renderedDateTime = moment({
          year: momentDate.year(),
          month: momentDate.month(),
          day: momentDate.date(),
          hour: momentTime.hours(),
          minute: momentTime.minutes()
  });

  return renderedDateTime.toISOString();
}

class AnnouncementForm extends Component {
	constructor(props){
		super(props);
		this.state= {
			title:"",
			start_date:null,
			end_date:null,
			description:"",
      open: false
		}
		this.uploadFile = this.uploadFile.bind(this);
    this.validateData = this.validateData.bind(this);
	}

  validateData(){
    var clean_data = true;
    if (this.state.title === ""){
      clean_data = false;
      this.setState({title_error:"This field is required"})
    }
    if (!this.state.start_date){
      clean_data = false;
      this.setState({start_error:"This field is required"})
    }
    if (!this.state.end_date){
      clean_data = false;
      this.setState({end_error:"This field is required"})
    }
    if (this.state.description === ""){
      clean_data = false;
      this.setState({description_error:"This field is required"})
    }
    return clean_data;
  }
	uploadFile(e) {

    if (!this.validateData()){
      return;
    }

    var fd = new FormData();
    var start = merge_date_time(this.state.start_date, this.state.start_time);
    var end = merge_date_time(this.state.end_date, this.state.end_time);

    fd.append('file', this.refs.file.files[0]);
    fd.append('title', this.state.title);
    fd.append('start_date', start);
    fd.append('end_date', end);
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
    $.ajax({
            url: this.props.url,
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                this.setState({
                                title:"",
                                start_date:null,
                                end_date:null,
                                description:"",
                                open:true
                              })
            }.bind(this) 
        })
        e.preventDefault()
    }

	render(){


    const close = (
        <FlatButton
          label="Close"
          primary={true}
          onTouchTap={function(){
                              this.setState({open:false})
                            }.bind(this)}
        /> 
      );

		return (
      <div>
			<Card>
      <CardTitle
        title="Make a new announcement"
        subtitle="These will be displayed to users in their dashboard"
      />
			<form ref="uploadForm" className="uploader" encType="multipart/form-data" >
           <TextField hintText="Announcement Title"
                      errorText={this.state.title_error}
                      id="title_field"
                      style={{margin:12}}
                      value={this.state.title} 
                      onChange={(e) => this.setState({title:e.target.value})}
           				/>
           <br/>
           
           <TextField hintText="Announcement Description"
                      errorText={this.state.description_error}
                      id='description_field'
                      value={this.state.description}
                      style={{margin:12}}
                      multiLine={true}	
                      onChange={(e) => this.setState({description:e.target.value})}
           				/>
           <br/>
           
           <DatePicker hintText="Enter start date"
                       id="start_date_field"  	
                       errorText={this.state.start_error}
                       style={{display: 'inline-block', margin:12}}
                       onChange={(event, moment)=>this.setState({start_date:moment})}
           				     value={this.state.start_date}/>
           <TimePicker hintText="Enter start time"
                       id="start_time_field"
                       errorText={this.state.start_error}
                       style={{display: 'inline-block'}}
                       onChange={(event, moment)=>this.setState({start_time:moment})}
                       value={this.state.start_time}/>
           <br/>

           <DatePicker hintText="Enter expiration date"
                       id="expiration_date_field"	
                       errorText={this.state.end_error}
                       style={{display: 'inline-block', margin:12}}
                       onChange={(event, moment)=>this.setState({end_date:moment})}
           				     value={this.state.end_date}
                       />
            <TimePicker hintText="Enter expiration time"
                        id="expiration_time_field" 
                        errorText={this.state.end_error}
                        style={{display: 'inline-block'}}
                        onChange={(event, moment)=>this.setState({end_time:moment})}
                        value={this.state.end_time}
                       />
            
           <CardActions>
            <RaisedButton containerElement='label'
                         label='Upload Attachments'
                         style={{margin:12}} >
             <input ref='file'
                    type='file' 
                    style={{cursor: 'pointer',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            left: 0,
                            width: '100%',
                            opacity: 0,
                          }} />
           </RaisedButton>

           <RaisedButton  containerElement='label'
                          label='Post announcement'
                          style={{margin:12}}
                          onClick={this.uploadFile} />
          </CardActions>
          </form>
         </Card>
          <Dialog title="Success!"
                  actions={close}
                  modal={false}
                  open={this.state.open}
                  onTouchTap={function(){this.setState({open:false})}.bind(this)}>
                  The announcement was created successfully!
          </Dialog>
          </div>

			)
	}
}

export default AnnouncementForm;