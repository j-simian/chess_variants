import Board, { Position } from "../boards/Board";
import Piece, { PieceType } from "./Piece";

export default class Rook extends Piece {
	constructor(team: number, position: Position) {
		super(team, position);
		this.type = PieceType.Rook;
	}

	override movePiece(position: Position) {
		super.movePiece(position);
	}

	override setRanges(position: Position): void {
		this.moveRange = [];
		for (let ii = -8; ii < 8; ii++) {
			if(position.x + ii > 7 || position.x + ii < 0) continue;
			this.moveRange.push({ x: position.x + ii, y: position.y });
		}
		for (let ii = -8; ii < 8; ii++) {
			if(position.y + ii > 7 || position.y + ii < 0) continue;
			this.moveRange.push({ x: position.x, y: position.y + ii });
		}
		this.captureRange = this.moveRange;
	}
}
