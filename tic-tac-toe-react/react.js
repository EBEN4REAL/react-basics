const Square = (props) => {
    return (
       <button 
        style={
            {
              width:'34px', 
              border: '1px solid #999',
              height: '34px' , 
              backgroundColor: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              lineHeight: '34px',
              outline: 'none'
            }
          }   
          onClick={props.clicked}>
            {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square 
      value={this.props.squares[i]}
      clicked={() => this.props.onClick(i)}/>;
  }

  render() {
    return (
      <div>
        <div className="status">{status}</div>
        <div>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  state = {
     history: [{
         squares: Array(9).fill(null),
       }],
    xIsNext: true,
    stepNumber: 0,
  }
  handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    console.log(history);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
  jumpTo = (step) => {
     this.setState({
       stepNumber: step,
       xIsNext: (step % 2) === 0,
     });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    console.log(current);
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div 
        style={{ 
            display: 'flex',
            flexDirection: 'row'
           }}>
        <div>
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

const calculateWinner = (squares) => {
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

  for(let i = 0; i < lines.length; i++){
   const  [a,b,c] = lines[i];
  //  console.log(a,b,c);
  //  console.log(squares[a]);
   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
     return squares[a];
   }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('app')
);