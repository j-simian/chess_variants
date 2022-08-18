import Board, { Position } from "../boards/Board";
import Piece, { PieceType } from "./Piece";

export default class Knight extends Piece {
	constructor(team: number, position: Position) {
		super(team, position);
		this.type = PieceType.Knight;
		this.setRanges(position);
	}

	override movePiece(position: Position) {
		super.movePiece(position);
		this.setRanges(position);
	}

	override setRanges(position: Position) {
		this.moveRange = [];
		for(let ii = -2; ii <= 2; ii++) {
			if(ii == 0) continue;
			for (let jj = -2; jj <= 2; jj++) {
				if(jj == 0) continue;
				if(Math.abs(ii) == Math.abs(jj)) continue;	
				this.moveRange.push({ x: position.x + ii, y: position.y + jj });
			}
		}
		this.captureRange = this.moveRange;
	}
}
