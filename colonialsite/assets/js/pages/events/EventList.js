import React from 'react';
import Event from './Event.js';
import EventFilterTable from './EventFilterTable.js';
import EventDetail from './EventDetail';
import EventDetailModal from './EventDetailModal';

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
    statics: { 
        sortTypes:
            [
                {id:"Date"},
                {id:"Category"},
                {id:"Location"}
            ]
    },  
    loadContentFromServer: function(){
        $.ajax({
            url:this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({data:data.results})
                this.updateFilters(this.state.types, this.state.excludePast);
                if (this.state.event){
                    this.setState({
                        event: this.state.filtered_data.find(event => event.pk == this.state.event.pk), 
                        showModal:true
                    })
                }
            }.bind(this)
        })
    },

    isFuture: function(event){
        var now = new Date();
        var date = new Date(event.end_date);
        return date > now;
    },

    getInitialState: function() {
        return {
            data: [], 
            filtered_data:[],
            types:
            [
                {id:"IMs", selected:true},
                {id:"Friday Party", selected:true},
                {id:"Semiformal", selected:true},
                {id:"Study Break", selected:true},
                {id:"Sophomore Dinner", selected:true},
                {id:"Language Table", selected:true},
                {id:"Members' Nights", selected:true},
                {id:"Weekly Events", selected:true},
                {id:"Other", selected:true}
            ],
            excludePast:true,
            sortType:"Date",
        }
    },
    componentDidMount: function() {
        this.loadContentFromServer();
    },
    updateFilters: function(types, excludePast) {
        //Types selected is a list of all the types of events that we want to include in the filtered_data
        this.setState({excludePast:excludePast, types:types});
        var types_selected = types.filter(function (type){
            return type.selected;
        });
        var filtered_data = this.state.data.reduce(function(events_selected, event){
                var hits = types_selected.filter(function(event_type){
                    return event_type.id === event.category;
                });
                if (hits.length > 0) {
                    if ((!excludePast || this.isFuture(event)) && event.status !== "Hidden")
                        events_selected.push(event);
                }
                return events_selected;
            }.bind(this), []);
        this.updateSort(this.state.sortType, filtered_data);
        if (this.state.event){
                    this.setState({
                        event: filtered_data.find(event => event.pk == this.state.event.pk), 
                        showModal:true
                    })
                }
    },

    updateSort: function(sortType, filtered_data){
        var sortFunction;
        switch(sortType){
            case "Category":
                sortFunction = sortByType;
                break;
            case "Location":
                sortFunction = sortByLocation;
                break;
            default:
                sortFunction = sortByDate;
        }
        this.setState({
            filtered_data: filtered_data.sort(sortFunction),
            sortType:sortType
        });
    },
    renderDetail: function(id, e) {
        this.setState({
                event: this.state.filtered_data.find(event => event.pk == id), 
                showModal:true
        })
        this.loadContentFromServer();
    },
    hideDetail:function(){
        this.setState({showModal:false});
    },
    render: function() {

        if (this.props.small){
            return (
                <div>
                        <EventFilterTable   events={this.state.filtered_data}
                                            types={this.state.types}
                                            sortTypes={EventList.sortTypes}
                                            selected_event={this.state.event}
                                            defaultSort={this.state.sortType}

                                            renderDetail={(id) => console.log()}
                                            updateFilteredList={this.updateFilters}
                                            updateSort={this.updateSort} />
                </div>
               )            
        }



        return (
                <div>
                    <div className="container col-md-12 col-sm-12 col-xs-12 col-lg-6">
                     <div className='scroll-container-header border-bottom-1'> Events: </div>
                        <EventFilterTable   events={this.state.filtered_data}
                                            types={this.state.types}
                                            sortTypes={EventList.sortTypes}
                                            selected_event={this.state.event}
                                            defaultSort={this.state.sortType}

                                            renderDetail={this.renderDetail}
                                            updateFilteredList={this.updateFilters}
                                            updateSort={this.updateSort} />
                    </div>
                    <div className="container col-lg-6 hidden-md hidden-sm hidden-xs">
                        <EventDetail key={"Large screen"}
                                     activeEvent={this.state.event}
                                     renderDetail={this.renderDetail} />
                    </div>
                    <div className="container">
                        <EventDetailModal key={"smallScreen"}
                                          activeEvent={this.state.event}
                                          showModal={this.state.showModal && window.innerWidth < 1200}
                                          onHide={this.hideDetail}
                                          renderDetail={this.renderDetail} />
                    </div>
                </div>
               )
    }
});

export default EventList;
