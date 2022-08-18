import Board, { Position } from "../boards/Board";

export enum PieceType {
	Undefined = 0,
	Pawn = 1,
	Rook = 2,
	Knight = 3,
	Bishop = 4,
	Queen = 5,
	King = 6,
}

class Piece {
	team: number;
	type: PieceType;
	position: Position = { x: -1, y: -1 };
	captureRange: Position[] = [];
	moveRange: Position[] = [];

	constructor(team: number, position: Position) {
		this.team = team;
		this.movePiece(position);
		this.type = PieceType.Undefined;
	}

	isMovePossible(board: Board, dest: Position): boolean {
		let target = board.getPiece(dest);
		if (
			this.moveRange.find((p) => p.x === dest.x && p.y === dest.y) ===
			undefined
		)
			return false;
		if (
			dest.x < 0 ||
			dest.y < 0 ||
			dest.x > board.sizeX ||
			dest.y > board.sizeY
		)
			return false;
		if (dest.x === this.position.x && dest.y === this.position.y)
			return false; // Can't move to the same square
		// if(target.type === PieceType.King) return false; // Can't capture a king
		if (target.type !== 0 && target.team === this.team)
			// Can't capture pieces of the same team
			return false;
		return true;
	}

	deliversCheck(pos: Position, board: Board): boolean {
		if (
			this.captureRange.find((p) => p.x === pos.x && p.y === pos.y) &&
			!board.isPieceInPath(this.team, board.getPath(this.position, pos))
		) {
			console.log(`${this.type} delivers check!`);
			return true;
		}
		return false;
	}

	movePiece(position: Position) {
		this.position = position;
		this.setRanges(this.position);
	}

	setRanges(position: Position) {
		this.moveRange = [];
		this.captureRange = [];
		if (position.x === -1 && position.y === -1) {
			return;
		}
	}
}

export default Piece;
