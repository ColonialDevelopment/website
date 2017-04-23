import React from 'react';
import Event from './Event.js';
import EventFilterTable from './EventFilterTable.js';
import EventDetail from './EventDetail';

function sortByDate(a, b){
    a = new Date(a.start_date);
    b = new Date(b.start_date);
    return a>b ? 1 : a<b ? -1 : 0;
}

function sortByType(a, b){
    a = a.category;
    b = b.category;
    return a>b ? -1 : a<b ? 1 : 0;
}
function sortByLocation(a, b){
    a = a.location;
    b = b.location;
    return a>b ? -1 : a<b ? 1 : 0;
}

var EventList = React.createClass({
    loadContentFromServer: function(){
        $.ajax({
            url:this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({data:data.results})
                this.updateFilters(this.state.types);
                this.updateSort("Date");
            }.bind(this)
        })
    },

    isFuture: function(event){
        var now = new Date();
        var date = new Date(event.start_date);
        return date > now;
    },
    changeExcludePast: function(e){
        this.setState({excludePast: e.target.checked},
            () => this.updateFilters(this.state.types)
            );
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
            {id:"Study Break", selected:true}
            ],
            sortTypes:
            [
            {id:"Date", checked:true},
            {id:"Category", checked:false},
            {id:"Location", checked:false}
            ],
            excludePast:true
        }
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
                    if ( (!this.state.excludePast || this.isFuture(event)) && event.status === "Open")
                        events_selected.push(event);
                }
                return events_selected;
            }.bind(this), [])});
    },
    updateSort: function(sortType){
        var sortFunction;
        switch(sortType){
            case "Category":
                sortFunction = sortByType;
                this.setState({
                    sortTypes:
                    [
                    {id:"Date", checked:false},
                    {id:"Category", checked:true},
                    {id:"Location", checked:false}
                    ]
                });
                break;
            case "Location":
                sortFunction = sortByLocation;
                this.setState({
                    sortTypes:
                    [
                    {id:"Date", checked:false},
                    {id:"Category", checked:false},
                    {id:"Location", checked:true}
                    ]
                });
                break;
            default:
                sortFunction = sortByDate;
                this.setState({
                    sortTypes:
                    [
                    {id:"Date", checked:true},
                    {id:"Category", checked:false},
                    {id:"Location", checked:false}
                    ]
                });
        }
        this.setState({filtered_data:
            this.state.filtered_data.sort(sortFunction)
        });
    },
    renderDetail: function(id) {
      this.setState({event: this.state.filtered_data.find(event => event.pk == id)})
    },
    render: function() {
        return (
                <div>
                    <div className="container col-md-12 col-sm-12 col-xs-12 col-lg-6">
                     <div className='scroll-container-header border-bottom-1'> Events: </div>
                        <EventFilterTable events={this.state.filtered_data}
                                            types={this.state.types}
                                            updateFilteredList={this.updateFilters}
                                            updateSort={this.updateSort}
                                            sortTypes={this.state.sortTypes}
                                            excludePast={this.state.excludePast}
                                            changeExcludePast={this.changeExcludePast}
                                            renderDetail={this.renderDetail} />
                    </div>
                    <div className="container col-lg-6 hidden-md hidden-sm hidden-xs">
                      <EventDetail activeEvent={this.state.event} />
                    </div>
                </div>
               )
    }
});

export default EventList;
