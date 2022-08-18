import React, { MouseEvent } from "react";

import BoardCellStyled, { PieceStyled } from "./BoardCell.styles";
import Board, { Empty, Position, BoardSquare } from "../../logic/boards/Board";

interface BoardCellProps {
	colour: number;
	pos: Position;
	board: Board;
	onSelect: (piece: Position) => void;
	highlight: boolean;
}

const BoardCell = ({
	colour,
	pos,
	board,
	onSelect,
	highlight,
}: BoardCellProps) => {
	let piece = board.getPiece(pos);
	return (
		<BoardCellStyled
			colour={colour}
			highlight={highlight}
			onClick={(e: MouseEvent<HTMLDivElement>) => onSelect(pos)}
		>
			{piece.type != 0 && <PieceStyled piece={piece} />}
		</BoardCellStyled>
	);
};

export default BoardCell;
