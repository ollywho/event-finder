import React, { Component } from 'react';
import EventsList from './EventsList';
import World from './World';

class FindEvents extends Component {
	componentWillMount() {
		this.generateWorld();
	}
    
	generateWorld() {
		var eventMatrix = [];
		var eventId = 0;
		for (var row = 0; row < 21; row++) {
			var rowEventList = [];
			for (var col = 0; col < 21; col++) {
				if (Math.random() >= 0.8) { // randomly determine if event exists at coordinate
					var ticketInfo = this.generateTicketInfo();
					var eventInfo = {
						id: row * 21 + col,
						eventId: eventId,
						tickets: ticketInfo.tickets,
						minPrice: ticketInfo.minPrice,
						x: col,
						y: row
					};
					rowEventList.push(eventInfo);
					eventId++;
				} else { // no event
					rowEventList.push({
						id: row * 21 + col,
						eventId: null,
						x: col,
						y: row
					});
				}
			}
			eventMatrix.push(rowEventList);
		}
		this.setState({
			eventMatrix: eventMatrix,
			closestEvents: [],
			coordinates: null
		});
	}

	generateTicketInfo() {
		var tickets = [];
		var minPrice = Number.MAX_VALUE;
		var numTickets = Math.random() * 100; // 0-99 tickets
		var priceCeil = Math.floor((Math.random() * 500) + 1); // tickets cost up to 500 USD

		for (var i = 0; i < numTickets; i++) {
			// ticket price will always be within upper half of priceCeil (for some arbitrary realism)
			var price = Math.round(Math.random() * (priceCeil / 2) + priceCeil / 2);
			minPrice = price < minPrice ? price : minPrice;
			tickets.push(price); 
		}
		return {
			tickets: tickets,
			minPrice: minPrice
		};
	}
    
	findEvents() {
		var coordinates = document.getElementById("coordinateInput").value.trim().split(",");
		if (coordinates.length !== 2) {
			alert("Invalid Coordinates. Please follow x,y coordinate format");
		} else {
			var x = parseInt(coordinates[0], 10) + 10; // shift to row col indices
			var y = parseInt(coordinates[1], 10) * -1 + 10;
			if (x < 0 || x > 21 || y < 0 || y > 21 || Number.isNaN(x) || Number.isNaN(y)) {
				alert("Invalid coordinates. X and Y must be within -10 and 10");
			} else {
				var closestEvents = this.eventSearch(x, y);
				this.setState({
					closestEvents: closestEvents,
					coordinates: coordinates
				});
			}
		}
	}

	eventSearch(x, y) { // uses BFS to find the five closest events
		var closestEvents = [];
		var visited = {};
		var queue = [];
		var world = this.state.eventMatrix;

		visited[world[y][x].id] = 1;
		queue.push(world[y][x]);

		while (queue.length > 0) {
			var location = queue.shift();
			if (location.eventId) {
				closestEvents.push({
					eventId: location.eventId,
					minPrice: location.minPrice,
					distance: Math.abs(location.x - x) + Math.abs(location.y - y)
				});
				if (closestEvents.length === 5) {
					return closestEvents;
				}
			}
			if (location.x > 0 && !visited.hasOwnProperty(world[location.y][location.x - 1].id)) { // visit left coordinate
				visited[world[location.y][location.x - 1].id] = 1;
				queue.push(world[location.y][location.x - 1]);
			}
			if (location.x < 20 && !visited.hasOwnProperty(world[location.y][location.x + 1].id)) { // visit right coordinate
				visited[world[location.y][location.x + 1].id] = 1;
				queue.push(world[location.y][location.x + 1]);
			}
			if (location.y > 0 && !visited.hasOwnProperty(world[location.y - 1][location.x].id)) { // visit top coordinate
				visited[world[location.y - 1][location.x].id] = 1;
				queue.push(world[location.y - 1][location.x]);
			}
			if (location.y < 20 && !visited.hasOwnProperty(world[location.y + 1][location.x].id)) { // visit bottom coordinate
				visited[world[location.y + 1][location.x].id] = 1;
				queue.push(world[location.y + 1][location.x]);
			}
		}

		return closestEvents;
	}

	clearResults() {
		document.getElementById("coordinateInput").value = "";
		this.setState({
			closestEvents: [],
			coordinates: null
		});
	}
      
	render() {
		return (
			<div className="FindEvents">
				Coordinates: <input id="coordinateInput" placeholder="x,y"/>
				<button onClick={this.findEvents.bind(this)}>Find Events</button>
				<button onClick={this.clearResults.bind(this)}>Clear Results</button> 
				<button onClick={this.generateWorld.bind(this)}>Generate Random World</button>
				<World eventMatrix={this.state.eventMatrix} coordinates={this.state.coordinates} closestEvents={this.state.closestEvents} />
				<EventsList events={this.state.closestEvents} coordinates={this.state.coordinates} />
			</div>
		);
	}
}

export default FindEvents;