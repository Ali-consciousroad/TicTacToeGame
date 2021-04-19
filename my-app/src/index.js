import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*  The square components no longer maintain state.
    The square components are now controlled components,
    they are controlled by the board to be more precise. */

    // Show the current state's value when clicked
    // When setState is called inside a component, React automatically updates the child comp. inside of it too.

/*
class Square extends React.Component {
    render() {
      return (
        
        <button         
            className="square" 
            onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
  }
*/

    // Replace the Square class with function components
    // Simplier way to write class that don't have their own state
    function Square(props) {
        return(
            <button className="square" onClick={props.onClick}>
              {props.value}  
            </button>
        );
    }

    class Board extends React.Component {
        // Add a new constructor to the board
        constructor(props){
            super(props);
            this.state = {
                squares: Array(9).fill(null),
            };
        }

    // Define the handleClick method
    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
    }

    renderSquare(i) {
      // Pass a prop value called square to the Square
      // Parthesis needed because of the multiple lines
      return (
        <Square 
            value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
        />
      );
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
  