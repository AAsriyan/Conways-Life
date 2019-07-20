import React, { Component } from 'react';
import Grid from './components/Grid';
import Buttons from './components/Buttons';
import Rules from './components/Rules';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.speed = 100;
		this.rows = 30;
		this.cols = 50;

		this.state = {
			generation: 0,
			gridFull: Array(this.rows)
				.fill()
				.map(() => Array(this.cols).fill(false))
		};
	}

	selectBox = (row, col) => {
		let gridCopy = arrayClone(this.state.gridFull);
		gridCopy[row][col] = !gridCopy[row][col];

		this.setState({
			gridFull: gridCopy
		});
	};

	seed = () => {
		let gridCopy = arrayClone(this.state.gridFull);
		for (let x = 0; x < this.rows; x++) {
			for (let y = 0; y < this.cols; y++) {
				if (Math.floor(Math.random() * 4) === 1) {
					gridCopy[x][y] = true;
				}
			}
		}

		this.setState({
			gridFull: gridCopy
		});
	};

	playButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
	};

	pauseButton = () => {
		console.log(this.intervalId);
		clearInterval(this.intervalId);
	};

	slow = () => {
		this.speed = 1000;
		this.playButton();
	};

	fast = () => {
		this.speed = 50;
		this.playButton();
	};

	clear = () => {
		let grid = Array(this.rows)
			.fill()
			.map(() => Array(this.cols).fill(false));

		this.setState({
			gridFull: grid,
			generation: 0
		});

		this.pauseButton();
	};

	gridSize = size => {
		switch (size) {
			case '1':
				this.cols = 20;
				this.rows = 10;
				break;
			case '2':
				this.cols = 50;
				this.rows = 30;
				break;
			default:
				this.cols = 70;
				this.rows = 50;
		}
		this.clear();
	};

	play = () => {
		let graph = this.state.gridFull;
		let graph2 = arrayClone(this.state.gridFull);

		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				let neighbors = 0;

				// Check the eight neighbors of the current cell, increment if neighbor exists/is alive
				if (i > 0) {
					if (graph[i - 1][j]) neighbors++;
				}

				if (i > 0 && j > 0) {
					if (graph[i - 1][j - 1]) neighbors++;
				}

				if (i > 0 && j < this.cols - 1) {
					if (graph[i - 1][j + 1]) neighbors++;
				}

				if (j < this.cols - 1) {
					if (graph[i][j + 1]) neighbors++;
				}

				if (j > 0) {
					if (graph[i][j - 1]) neighbors++;
				}

				if (i < this.rows - 1) {
					if (graph[i + 1][j]) neighbors++;
				}

				if (i < this.rows - 1 && j > 0) {
					if (graph[i + 1][j - 1]) neighbors++;
				}

				if (i < this.rows - 1 && j < this.cols - 1) {
					if (graph[i + 1][j + 1]) neighbors++;
				}

				// After checking for the neighbors, determine if the current cell should live or die
				if (graph[i][j] && (neighbors < 2 || neighbors > 3)) {
					graph2[i][j] = false;
				}

				if (!graph[i][j] && neighbors === 3) {
					graph2[i][j] = true;
				}
			}
		}
		this.setState({
			gridFull: graph2,
			generation: this.state.generation + 1
		});
	};

	componentDidMount() {
		this.seed();
		// this.playButton();
	}
	render() {
		return (
			<div className="App">
				<h1>Conway's Game of Life</h1>
				<Buttons
					playButton={this.playButton}
					pauseButton={this.pauseButton}
					slow={this.slow}
					fast={this.fast}
					clear={this.clear}
					seed={this.seed}
					gridSize={this.gridSize}
				/>
				<h2>Generations: {this.state.generation}</h2>
				<Grid
					gridFull={this.state.gridFull}
					rows={this.rows}
					cols={this.cols}
					selectBox={this.selectBox}
				/>
				<Rules />
				<p className="details">
					To check out the history and technical details of Conway's Game of
					Life:{' '}
					<a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
						Click Here
					</a>
				</p>
			</div>
		);
	}
}

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

export default App;
