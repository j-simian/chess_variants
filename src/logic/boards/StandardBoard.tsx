import Board, { Empty, BoardSquare, Position } from "./Board";
import { PieceType } from "../pieces/Piece";

class StandardBoard extends Board {

	private board: BoardSquare[][] = [[]];
	teams = 2;
	sizeX = 8;
	sizeY = 8;

	getPiece(pos: Position): BoardSquare {
		if(pos.x < 0 || pos.y < 0 || pos.x > 7 || pos.y > 7 ) {
			return { type: Empty.InvalidSquare };
		}
		return this.board[pos.x][pos.y];
	}
	
	getPath(src: Position, dest: Position): Position[] {
		let path: Position[] = [];
		if(src.x == dest.x && src.y == dest.y) path = [src];
		if(src.x == dest.x) {
			for (let ii = src.y; ii < dest.y+1; ii++) {
				path.push({ x: src.x, y: src.y+ii });
			}	
		}
		if (src.y == dest.y) {
			for (let ii = src.x; ii < dest.x+1; ii++) {
				path.push({ x: src.x+ii, y: src.y });
			}	
		}
		if (Math.abs(dest.x-src.x) == Math.abs(dest.y-src.y)) {
			for (let ii = src.x; ii < dest.x+1; ii++) {
				path.push({ x: src.x+ii, y: src.y+ii });
			}	
		}
		return path;
	}

	movePiece(src: Position, dest: Position) {
		let piece = this.getPiece(src);
		// Ensure the move is valid
		if(!this.isMovePossible(src, dest)){
			console.error(`InvalidMoveException: Team ${this.currTeam} tried to move from ${src} to ${dest} on move ${this.moveNumber}`);	
		}

		// Swap the pieces
		this.board[src.x][src.y] = { type: Empty.None }
		this.board[dest.x][dest.y] = piece;

		// Increment move and team counter
		this.currTeam += 1;
		this.currTeam %= this.teams;
		if(piece.team == 0) this.moveNumber++;
	}

	isMovePossible(src: Position, dest: Position): boolean {
		let { type, team } = this.getPiece(src);
		if(team != this.currTeam) return false;
		if(Object.values(Empty).includes(typeof type)) return false;
		if(dest.x < 0 || dest.y < 0 || dest.x > this.sizeX || dest.y > this.sizeY ) return false;
		if(dest == src) return false;
		let path = this.getPath(src, dest);
		if(this.isPieceInPath(team, path)) return false;
		switch (type) {
			case PieceType.King:
				return this.isMovePossibleKing(team!, src, dest);
			case PieceType.Queen:
				return this.isMovePossibleQueen(team!, src, dest);
			case PieceType.Bishop:
				return this.isMovePossibleBishop(team!, src, dest);
			case PieceType.Knight:
				return this.isMovePossibleKnight(team!, src, dest);
			case PieceType.Rook:
				return this.isMovePossibleRook(team!, src, dest);
			case PieceType.Pawn:
				return this.isMovePossiblePawn(team!, src, dest);
			default:
				return false;
		}
	}

	isMovePossibleKing(team: number, src: Position, dest: Position): boolean {
		if(Math.abs(dest.x-src.x) > 1 && Math.abs(dest.y-src.y) > 1) return false;
		return true;
	}

	isMovePossibleQueen(team: number, src: Position, dest: Position): boolean {
		if(Math.abs(dest.x-src.x) != Math.abs(dest.y-src.y) 
				&& dest.x-src.x != 0 
				&& dest.y-src.y != 0) return false;
		return true;
	}

	isMovePossibleBishop(team: number, src: Position, dest: Position): boolean {
		if(Math.abs(dest.x-src.x) != Math.abs(dest.y-src.y)) return false;
		return true;
	}

	isMovePossibleKnight(team: number, src: Position, dest: Position): boolean {
		return true;
	}

	isMovePossibleRook(team: number, src: Position, dest: Position): boolean {
		if(dest.x-src.x != 0 
				&& dest.y-src.y != 0) return false;
		return true;
	}

	isMovePossiblePawn(team: number, src: Position, dest: Position): boolean {
		// TODO en-passant
		let path = this.getPath(src, dest);
		if(dest.y-src.y != team * (-2) + 1 
				&& Math.abs(dest.x-src.x) == 1 
				&& this.getPiece(dest).team != team) return true; // Capture
		if(dest.y-src.y != team * (-2) + 1 && dest.x-src.x == 0) return false;
		return true;
	}
	 
	isPieceInPath(team: number, path: Position[]): boolean {
		if(path.find(
					(pos: Position) => this.getPiece(pos).team! == team
		)) return true;
		path.pop();
		if(path.find(
					(pos: Position) => this.getPiece(pos).team! == team
		)) return true;
		return false;
	}
}

export default StandardBoard;
