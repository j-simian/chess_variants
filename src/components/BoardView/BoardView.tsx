import React from 'react';

import Board, { BoardSquare } from "../../logic/boards/Board";
import StandardBoard from "../../logic/boards/StandardBoard";
import { BoardContainer, BoardRow } from "./BoardView.styles";
import BoardCell from "./BoardCell";

const BoardView = () => {
	let board: Board = new StandardBoard();
	let cells = [];

	function drag(e: MouseEvent, piece: BoardSquare) {

	}

	for (let ii = 0; ii < board.sizeX; ii++) {
		let rowCells = [];
		for (let jj = 0; jj < board.sizeY; jj++) {
			rowCells.push(<BoardCell 
					colour={ (jj+ii) % 2 } 
					piece={ board.getPiece({ x: jj, y: ii }) }
					drag={ drag }
			/>);	
			// board.getPiece({ x: ii, y: jj });
		}	
		let row = <BoardRow>{rowCells}</BoardRow>;
		cells.push(row);
	}

	return (
		<BoardContainer>
			{ cells }
		</BoardContainer>
	);
};

export default BoardView;
