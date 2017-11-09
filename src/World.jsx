import React, { Component } from 'react';

class World extends Component {
	isCloseEvent(events, event) {
		for (var i = 0; i < events.length; i++) {
			if (events[i].eventId === event.eventId) {
				return true;
			}
		}
		return false;
	}

	renderWorld() {
		var eventMatrix = this.props.eventMatrix;
		var world = [];
		var x = this.props.coordinates === null ? -1 : parseInt(this.props.coordinates[0], 10) + 10;
		var y = this.props.coordinates === null ? -1 : parseInt(this.props.coordinates[1], 10) * -1 + 10;
		for (var row = 0; row < 21; row++) {
			var worldRow = [];
			for (var col = 0; col < 21; col++) {
				var className = (row === y && col === x) ? "SelectedCell" 
					: this.isCloseEvent(this.props.closestEvents, eventMatrix[row][col]) ? "CloseEventCell"
					: eventMatrix[row][col].eventId ? "EventCell" 
					: "";

				var label = (row === 10 && col === 10) ? "0" 
					: (row === 10 && col === 0) ? "-10" 
					: (row === 10 && col === 20) ? "10"
					: (row === 0 && col === 10) ? "10" 
					: (row === 20 && col === 10) ? "-10" 
					: ""; 

				worldRow.push(
					<td key={row * 21 + col} nowrap="nowrap" className={className}>{label}</td>
				);
			}
			world.push(worldRow);
		}
		return world;
	}
		
	render() {
		return (
			<div className="World">
				<table>
					<tbody>
						{this.renderWorld().map((value, index) => {
							return (
								<tr key={index}>
									{value.map((innerValue, index) => {
										return innerValue;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
  }
}

export default World;