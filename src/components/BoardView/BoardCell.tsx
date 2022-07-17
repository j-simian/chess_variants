import React from 'react';

import BoardCellStyled, { PieceStyled } from "./BoardCell.styles";
import { BoardSquare, Empty } from "../../logic/boards/Board";

interface BoardCellProps {
	colour: number,
	piece: BoardSquare,
	drag: (e: MouseEvent, piece: BoardSquare) => void,
}

const BoardCell = ({ colour, piece, drag }: BoardCellProps) => {
	return (
		<BoardCellStyled colour={ colour } onClick{ e => drag(e, piece) }>
			{ piece.type != Empty.None && <PieceStyled piece={ piece } /> }
		</BoardCellStyled>
	);
};

export default BoardCell;
