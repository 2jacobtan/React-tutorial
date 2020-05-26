import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  handleClick(j) {
    if (this.props.boardState.squares[j]
      || this.props.boardState.winner)
      return;

    const squares = this.props.boardState.squares.slice();
    squares[j] = this.props.boardState.xIsNext ? 'X' : 'O';

    this.props.updateGameHistory(squares);
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.boardState.squares[i]}
        onClick={
          this.props.boardState.winner
          ? null
          : () => this.handleClick(i)
        }
      />
    );
  }

  render() {
    let status =
      this.props.boardState.winner
        ? "Winner: " + this.props.boardState.winner
        : 'Next player: '
        + (this.props.boardState.xIsNext ? 'X' : 'O');

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
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        winner: null,
        xIsNext: true
      }],
      currentTurn: 0,
    };
  }

  updateHistory(current_squares) {
    this.setState({
      history: [...this.state.history.slice(0,this.state.currentTurn+1),
        {
          squares: current_squares,
          winner: calculateWinner(current_squares),
          xIsNext: !this.state.history[this.state.currentTurn].xIsNext
        }
      ],
      currentTurn: this.state.currentTurn + 1,      
    });
  }

  jumpTo(turn) {
    this.setState({
      currentTurn: turn
    });
  }

  render() {
    const moves = this.state.history.map((state, turn) => {
      const desc = "Go to turn #" + turn;
      return (
        <li>
          <button onClick={() => this.jumpTo(turn)}>{desc}</button>
        </li>
      )
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            boardState={this.state.history[this.state.currentTurn]}
            updateGameHistory={(s) => this.updateHistory(s)}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

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
