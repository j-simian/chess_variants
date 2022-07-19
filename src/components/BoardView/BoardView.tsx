import React, { useState, MouseEvent } from 'react';

import Board, { BoardSquare, Position, Empty } from "../../logic/boards/Board";
import StandardBoard from "../../logic/boards/StandardBoard";
import { BoardContainer, BoardRow } from "./BoardView.styles";
import BoardCell from "./BoardCell";
import { PieceStyled } from "./BoardCell.styles";

const BoardView = () => {
	let [ board, setBoard ] = useState<Board>(new StandardBoard());
	let cells = [];
	let [ selectedPiece, setSelectedPiece ] = useState<Position>({ x: -1, y: -1 });


	function selectPiece(pos: Position) {
		let piece = board.getPiece(selectedPiece);
		if(piece.type != Empty.None && piece.type != Empty.InvalidSquare) {
			setBoard(board.movePiece(selectedPiece, pos));
			setSelectedPiece({ x: -1, y: -1 })
		} else {
			setSelectedPiece(pos);
		}
	}


	for (let ii = 0; ii < board.sizeX; ii++) {
		let rowCells = [];
		for (let jj = 0; jj < board.sizeY; jj++) {
			let currPos = { x: jj, y: ii }
			rowCells.push(<BoardCell 
					colour={ (jj+ii) % 2 } 
					pos={ currPos }
					board={ board }
					onSelect={ selectPiece }
					highlight={  
						board.getPiece(selectedPiece).type != Empty.InvalidSquare && 
						board.isMovePossible(selectedPiece, currPos) &&
						board.getPiece(selectedPiece).team == board.currTeam	
					}
						
			/>);	
		}	
		let row = <BoardRow>{rowCells}</BoardRow>;
		cells.push(row);
	}

	return (
		<>
			<BoardContainer>
				{ cells }
			</BoardContainer>
			<p>
			{ 
				board.isPositionCheckmate(0) ? "Black Won!" : 
					board.isPositionCheckmate(1) ? "White Won!" : "" 
			}
			</p>
		</>
	);
};

export default BoardView;
