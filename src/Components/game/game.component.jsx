import React from "react";
import './game.styles.css'

import { Button } from 'react-bootstrap';
import {Board} from "../board/board.component";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{squares : Array(9).fill(null)}],
            xIsNext: true,
            stepNumber: 0,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{squares: squares}]),
            xIsNext: !this.state.xIsNext,
            stepNumber:  history.length,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const player = this.state.xIsNext ? 'X' : 'O';
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const status = winner ? winner + ' a gagné ' : 'Next player: ' + player;
        const moves = history.map((step, move) => {
            const desc = move ?
                'Revenir au tour n°' + move :
                'Revenir au début de la partie';
            return (
                <li key={move}>
                    <Button  variant="outline-info" onClick={() => this.jumpTo(move)}>{desc}</Button>
                </li>
            );
        });

        return (
            <div>
                <div className="title">
                    Morpion Game
                </div>
                <div className="game">
                    <div className="game-board">
                        <div className="subtitle">{status}</div>
                        <Board
                            squares={current.squares}
                            onClick = {(i) => this.handleClick(i)}/>
                    </div>
                    <div className="game-info">
                        <ol>{moves}</ol>
                    </div>
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
        if(squares[a] && squares[a] === squares[b] && squares[c] === squares[b]){
            return squares[a];
        }
    }
    return null;
}


