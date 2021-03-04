
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'


//los cuadros como se comporta cada uno
function Square(props){
    
    return (
        <button className='square' 
        onClick={props.onClick}> 
            {props.value}
        </button>
    ); 
    //test
}

//comportamiento del tablero
class Board extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: true,
            status: '',
            jugadas: 0
        };
    }

    //hace que pase de una X a O segun sea el turno 
    handleClick(i){
        const squares = this.state.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState(
            {squares: squares,
            xIsNext: !this.state.xIsNext,
        });

    }

    //asigna el valor de cada cuadro
    renderSquare(i){
        this.state.jugadas = this.state.jugadas + 1;
        return (
            <Square 
                value={this.state.squares[i]}
                onClick={ () => this.handleClick(i)}
            />
        )
    }

    jugar(){
       
        window.location.reload();
        
    }
    //grid de caudros que se presenta y que jugadro va 
    render(){
        const jugarDeNuevo = <button className="jugardenuevo" onClick={this.jugar}>Jugar de Nuevo</button>
        this.state.winner = calculateWinner(this.state.squares);
      
        if(this.state.winner){
            this.state.status = "Winner: " + this.state.winner; 
        }else{
            this.state.status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return(
            <div className="board">
                <div className='status'>
                    {this.state.status}
                </div>
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
                { this.state.winner != null || this.state.jugadas == 90  ? jugarDeNuevo : <h1>Hola</h1> }
                <button onClick={() => alert(this.state.winner + " " + this.state.jugadas)}>status de Winner</button>
            </div>
        )
    }
}

//this is a test modafuckas :P 

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
  


ReactDOM.render(
        <Game />
    ,
    document.getElementById('root')
);

  //calcular un ganador
  function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        } 
    }
    return null;
}