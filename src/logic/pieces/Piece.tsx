import Board, { Position } from "../boards/Board";

export enum PieceType {
	Pawn=1,
	Rook=2,
	Knight=3,
	Bishop=4,
	Queen=5,
	King=6
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
