import {Component} from 'react';
import {Panel, Image} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import EditableTextBox from './EditableTextBox';

class Member extends Component{
	constructor(props){
		super(props);
		this.state={
			bio:this.props.member.bio
		}
	}
	render(){
		const {	name, 
				netid, 
				class_year, 
				major, 
				room_num, 
				dorm,
				hometown,
				officer_pos, 
				pref_name,
				birthday,
				bio} = this.props.member
		return (
			<div className="container">
				<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
				<Panel>
					<div className="col-md-2 col-lg-2 col-sm-4 col-xs-4">
						<Panel style={{backgroundColor:"gray"}}>
						<Image src={"https://tigerbook.herokuapp.com/images/"+netid} responsive />
						</Panel>
					</div>
					<div className="col-md-8 col-lg-8 col-sm-8 col-xs-8">
						<br/><br/>
						<h2 className="text-center">{pref_name} {name}</h2>
						<div className="text-center">
						{netid}@princeton.edu
						<br/>
						{major} {class_year}
						<br/>
						{room_num} {dorm}
						<br/>
						{hometown}
						</div>
					</div>
					<div className="col-sm-12 col-md-10 col-lg-10 col-xs-12">
						<h2>Bio</h2>
						<EditableTextBox  default_text={this.state.bio}
										  key={"bio_text"}
										  className={"p"}
              							  staticElement={"div"}
							              editingElement={"textarea"}
							              activeClassName={"form-control bio-input"}
							              maxLength={2000}
							              style={{font:15, height:"300px !important"}}
										   />
					</div>
				</Panel>
				</div>
			</div>
			)
	}
}

export default Member;