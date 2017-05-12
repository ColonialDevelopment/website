import {Component} from 'react';
import Member from './Member';
import {Typeahead} from 'react-bootstrap-typeahead';

class MemberList extends Component{
	constructor(props){
		super(props);
		this.state={
			members:[],
			displayed_members:[]
		}
	}
	loadContentFromServer() {
        $.ajax({
        	context:this,
            url: this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({members:data.results});
            }.bind(this)
        })
    }

    handleSearch(data){
    			console.log(data);
    	const new_display = this.state.members.filter(member => {
    				return (member.name.toLowerCase()).includes(data[0].name.toLowerCase())
    			});
    	this.setState({displayed_members:new_display})
    }
	componentDidMount() {
        this.loadContentFromServer();
    }
	render() {

		if (this.state.displayed_members.length > 0){
			
			var displayedMembers = this.state.displayed_members.map(function(member){
				return (<div className='col-md-4'>
							<Member 	key={member.netid}
										member={member}
						 				editable={false} />
						</div>)
			})
		}
		else{
			if (this.state.members){
				var displayedMembers = this.state.members.map(function(member){
					return (<div className='col-md-4'>
								<Member 	key={member.netid}
											member={member}
						 					editable={false} />
							</div>)
				})
			}
		}
		return (
			<div className='col-md-6'>
			<Typeahead onChange={this.handleSearch.bind(this)}
					   options={this.state.members}
					   labelKey={'name'}
					   placeholder="Search our members!"
					   filterBy={['name', 'major', 'dorm', 'hometown', 'netid', 'officer_pos']} 
					    />
			<br/>
			{displayedMembers}
		    </div>
			)
	}
}
export default MemberList;