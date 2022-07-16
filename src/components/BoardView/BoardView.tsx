import React from 'react';

import Board from "../../logic/boards/Board";
import StandardBoard from "../../logic/boards/StandardBoard";
import { BoardContainer, BoardCell, BoardRow } from "./BoardView.styles";

const BoardView = () => {
	let board: Board = new StandardBoard();
	let cells = [];

	for (let ii = 0; ii < board.sizeX; ii++) {
		let rowCells = [];
		for (let jj = 0; jj < board.sizeY; jj++) {
			rowCells.push(<BoardCell />);	
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
