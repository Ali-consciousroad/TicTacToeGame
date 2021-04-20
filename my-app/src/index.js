import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

    // Replace the Square class with function components
    // Simplier way to write class that don't have their own state
    // this.props changed to props both times it appears
    function Square(props) {
        return(
            <button className="square" onClick={props.onClick}>
              {props.value}  
            </button>
        );
    }

    class Board extends React.Component {
    // Define the handleClick method
    /* update the Board's handleClick function to flip 
       the value of xIsNext */
    

    renderSquare(i) {
      // Pass a prop value called square to the Square
      /* Parthesis needed because of the multiple lines
         so that JS doesn't insert a semicolon 
         after return and break our code! */
      return (
        <Square 
            value={this.props.squares[i]} 
            /*onClick={() => this.handleClick(i)}*/
            onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
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

  /* 
    The top-level Game component can now access the history of past moves. 
    Place the history state in the top-level Game component.
    This let us remove the squares state from its child board component. 
    Lifted state up from the square component into the board component.
  */

  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        xIsNext: true
      };
    }

    // handleCLick component is moved (from the Board component) to the Game component   
    handleClick(i) {
      const history = this.state.history;
      const current = history[history.length -1];
      const squares = current.squares.slice();
      // Click is ignored if someone has won or if a square is already filled
      if (calculateWinner(squares) || squares[i]){
        return;
      }
      // Ternary conditional operator
      // Flip the value of xIsNext so players can take turns
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        // Unlike the push() method, concat() doesn't mutate the orginal array 
        history: history.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
      });
  }

    render() {
      // Status is changed each turn 
      // Check if one player has won the game
      const history = this.state.history;
      const current = history[history.length -1];
      const winner = calculateWinner(current.squares);
      let status;
      if(winner){
        status = 'Winner: ' + winner;
      } 
      else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // Helper function used to declare a winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  