import Board, { Position } from "../boards/Board";
import Piece, { PieceType } from "./Piece";

export default class Pawn extends Piece {

	hasMoved = false;

	constructor(team: number, position: Position) {
		super(team, position);
		this.type = PieceType.Pawn;
		this.hasMoved = false;
		this.setRanges(position);
	}

	override movePiece(position: Position) {
		super.movePiece(position);
		if(!this.hasMoved) this.hasMoved = true;
	}

	override isMovePossible(board: Board, dest: Position): boolean {
		const target = board.getPiece(dest);
		return super.isMovePossible(board, dest) 
			&& (this.captureRange.find((p) => (p.x == dest.x && p.y == dest.y)) != undefined 
			? target.type != 0 && target.team != this.team
			: true) // only capture if a piece from the enemy team is there.
			&& (this.captureRange.find((p) => (p.x == dest.x && p.y == dest.y)) == undefined 
			? target.type == 0
			: true ) // cannot capture pieces that aren't in the capture range.
	}

	override setRanges(position: Position): void {
		this.moveRange = [ 
			...(!this.hasMoved ? [{ x: position.x, y: position.y + 2 * (this.team*2-1) }] : []), 
			{x: position.x, y: position.y + this.team*2-1},
			{ x: position.x + 1, y: position.y + this.team*2-1 },
			{ x: position.x - 1, y: position.y + this.team*2-1 }
		];
		this.captureRange = this.moveRange.filter((p) => (p.x != position.x));
	}
}
