import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const boardsize = {
  // standard board
  rows: 8,
  columns: 8,
};

const boardcolors = {
  light: '#FFCE9E',
  dark: '#D18B47',
};

function Square(props){
  return (
    <button className="square" onClick={props.onClick} style={{background: props.boardcolor}}>
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {  
  renderSquare(r, c, i) {
    return (
      <Square 
      value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
      boardcolor={(r + c) % 2 == 0 ? boardcolors.light : boardcolors.dark}
      />
    )
  }

  render() {
    let rows = [];
    for (let r = 0; r < boardsize.rows; ++r){
      let cols = [];
      for (let c = 0; c < boardsize.columns; ++c){
        cols.push(this.renderSquare(r, c, 8*r + c));
      }
      rows.push(<div className="board-row">{cols}</div>)
    }

    return <div>{rows}</div>
  }
}
  
class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const s = current.squares.slice();
    if (s[i] || calculateWinner(s)){
      return;
    }

    s[i] = this.state.xIsNext ? 'X' : 'O';
    
    this.setState({
      history: history.concat([{
        squares: s, 
      }]),      
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner){
      status = `Winner: ${winner[0]}`;
    }else{
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    const moves = history.map( (step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}> {desc} </button>
        </li>
      )
    })


    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
          highlight={winner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
  
function calculateWinner(squares) {
  // used for tic tac toe tutorial
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
      return [squares[a], a, b, c];
    }
  }
  return null;
}