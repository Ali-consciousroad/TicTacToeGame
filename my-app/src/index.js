import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    // Add a constructor to the class to initialize the state and remember when a square is clicked
    constructor(props) {
        // In JS classes, we need to always call "super" when defining the constructor of a sublclass
        // All React component classes that have a constructor should start with a super(props) call.
        super(props);
        this.state = {
            value: null,
        };
    } 

    render() {
      return (
        // Show the current state's value when clicked
        // Wen setState is called inside a component, React automatically updates the child comp. inside of it too.
        <button className="square" 
                onClick={() => this.setState({value: 'X'})}
        >
          {this.state.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      // Pass a prop value called square to the Square
      return <Square value={i} />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  