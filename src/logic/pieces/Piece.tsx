import Board, { Position } from "../boards/Board";

export enum PieceType {
	Pawn,
	Rook,
	Knight,
	Bishop,
	Queen,
	King
}

class Piece {
	
	team: number;

	constructor(team: number) {
		this.team = team;
	}

	isMovePossible(board: Board, src: Position, dest: Position): boolean {
		return board.isMovePossible(src, dest);
	}
}

export default Piece;
