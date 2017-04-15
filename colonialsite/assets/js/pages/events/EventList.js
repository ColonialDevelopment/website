import React from 'react';
import Event from './Event.js';
import EventFilterTable from './EventFilterTable.js';
import EventFilterDropdown from './EventFilterDropdown.js';
/*import _ from 'lodash';*/

var EventList = React.createClass({
    loadContentFromServer: function(){
        $.ajax({
            url:this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({data:data.results});
                this.updateFilters(this.state.types);
            }.bind(this)
        })
    },

    getInitialState: function() {
        return {data: [], filtered_data:[], 
            types:
            [
            {id:"Semiformal", selected:true},
            {id:"Friday Party", selected:true},
            {id:"Other", selected:true},
            {id:"Language Table", selected:true},
            {id:"Sophomore Dinner", selected:true},
            ]}
    },

    componentDidMount: function() {
        this.loadContentFromServer();
        setInterval(this.loadContentFromServer,
            this.props.pollInterval)
    },
    updateFilters: function(types) { 
        //Types selected is a list of all the types of events that we want to include in the filtered_data
        var types_selected = types.filter(function (type){
            return type.selected;
        });
        this.setState({filtered_data: 
            this.state.data.reduce(function(events_selected, event){
                var hits = types_selected.filter(function(event_type){
                    return event_type.id === event.category;
                });
                if (hits.length > 0) {
                    events_selected.push(event);
                }
                return events_selected;
            }, [])});
    },
    render: function() {
        
        return (
                <div>
                    <div className="container col-md-12 col-sm-12 col-xs-12 col-lg-6">
                     <div className='scroll-container-header border-bottom-1'> Events: </div>
                        <div className="scroll-container">
                        <EventFilterDropdown types={this.state.types} updateFilteredList={this.updateFilters} />
                        <EventFilterTable events={this.state.filtered_data} />
                        </div>
                    </div>
                </div>
               )
    }
});

export default EventList;
