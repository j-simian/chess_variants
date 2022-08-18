import Board, { Position } from "../boards/Board";
import Piece, { PieceType } from "./Piece";

export default class King extends Piece {
	constructor(team: number, position: Position) {
		super(team, position);
		this.type = PieceType.King;
	}

	override movePiece(position: Position) {
		super.movePiece(position);
	}

	override setRanges(position: Position): void {
		this.moveRange = [];
		for (let ii = -1; ii <= 1; ii++) {
			for (let jj = -1; jj <= 1; jj++) {
				if(ii == 0 && jj == 0) continue;
				this.moveRange.push({ x: position.x + ii, y: position.y + jj });
			}
		}
		this.captureRange = this.moveRange;
	}
}
