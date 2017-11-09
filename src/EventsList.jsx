import React, { Component } from 'react';

class EventsList extends Component {
		
	render() {
		var inputCoordinates = this.props.coordinates === null ? null : 
			<h4>Closest Events to ({this.props.coordinates[0]},{this.props.coordinates[1]}):</h4>

		return (
			<div className="EventsList">
				{inputCoordinates}
				<ul>
					{this.props.events.map((value, index) => {
						return <li key={index}>{"Event " + value.eventId + " - $" + value.minPrice + ", Distance " + value.distance}</li>
					})}
				</ul>
			</div>
    );
  }
}

export default EventsList;