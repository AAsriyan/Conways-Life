import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, Dropdown } from 'react-bootstrap';

class Buttons extends Component {
	handleSelect = e => {
		this.props.gridSize(e);
	};
	render() {
		return (
			<div>
				<ButtonToolbar>
					<button className="btn btn-default" onClick={this.props.playButton}>
						Play
					</button>
					<button className="btn btn-default" onClick={this.props.pauseButton}>
						Pause
					</button>
					<button className="btn btn-default" onClick={this.props.clear}>
						Clear
					</button>
					<button className="btn btn-default" onClick={this.props.slow}>
						Slow
					</button>
					<button className="btn btn-default" onClick={this.props.fast}>
						Fast
					</button>
					<button className="btn btn-default" onClick={this.props.seed}>
						Seed
					</button>
					<DropdownButton
						title="Grid Size"
						id="dropdown-basic-button"
						onSelect={this.handleSelect}
					>
						<Dropdown.Item eventKey="1">20x10</Dropdown.Item>
						<Dropdown.Item eventKey="2">50x30</Dropdown.Item>
						<Dropdown.Item eventKey="3">70x50</Dropdown.Item>
					</DropdownButton>
				</ButtonToolbar>
			</div>
		);
	}
}

export default Buttons;
