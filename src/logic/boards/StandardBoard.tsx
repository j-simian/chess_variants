import Board, { Empty, BoardSquare, Position } from "./Board";
import { PieceType } from "../pieces/Piece";

class StandardBoard extends Board {

	private board: BoardSquare[][] = [[]];
	teams = 2;
	sizeX = 8;
	sizeY = 8;

	pawnsMoved: boolean[][] = [];
	

	constructor() {
		super();
		this.initBoard();
		for (let ii = 0; ii < this.teams; ii++) {
			let pawnsMovedRow = [];
			for (let jj = 0; jj < this.sizeX; jj++) {
				pawnsMovedRow.push(false);
			}
			this.pawnsMoved.push(pawnsMovedRow);
		}
	}

	getPiece(pos: Position): BoardSquare {
		if(pos.x < 0 || pos.y < 0 || pos.x > 7 || pos.y > 7 ) {
			return { type: Empty.InvalidSquare };
		}
		return this.board[pos.y][pos.x];
	}

	emptyBoard() {
		const empty = { type: Empty.None };
		this.board = [
			[ empty, empty, empty, empty,
				empty, empty, empty, empty ],
			[ empty, empty, empty, empty,
				empty, empty, empty, empty ],
			[ empty, empty, empty, empty,
				empty, empty, empty, empty ],
			[ empty, empty, empty, empty,
				empty, empty, empty, empty ],
			[ empty, empty, empty, empty,
				empty, empty, empty, empty ],
			[ empty, empty, empty, empty,
				empty, empty, empty, empty ],
			[ empty, empty, empty, empty,
				empty, empty, empty, empty ],
			[ empty, empty, empty, empty,
				empty, empty, empty, empty ],
		]
	}

	initBoard() {
		const blackKing = { type: PieceType.King, team: 1 };
		const blackQueen = { type: PieceType.Queen, team: 1 };
		const blackBishop = { type: PieceType.Bishop, team: 1 };
		const blackKnight = { type: PieceType.Knight, team: 1 };
		const blackRook = { type: PieceType.Rook, team: 1 };
		const blackPawn = { type: PieceType.Pawn, team: 1 };
		const whiteKing = { type: PieceType.King, team: 0 };
		const whiteQueen = { type: PieceType.Queen, team: 0 };
		const whiteBishop = { type: PieceType.Bishop, team: 0 };
		const whiteKnight = { type: PieceType.Knight, team: 0 };
		const whiteRook = { type: PieceType.Rook, team: 0 };
		const whitePawn = { type: PieceType.Pawn, team: 0 };
		const empty = { type: Empty.None, team: -1 };
		this.board = [
			[ blackRook, blackKnight, blackBishop, blackQueen,
				blackKing, blackBishop, blackKnight, blackRook ],
			[ blackPawn, blackPawn, blackPawn, blackPawn,
				blackPawn, blackPawn, blackPawn, blackPawn ],
			[ empty, empty, empty, empty,
				empty, empty, empty, empty ],
			[ empty, empty, empty, empty,
				empty, empty, empty, empty ],
			[ empty, empty, empty, empty,
				empty, empty, empty, empty ],
			[ empty, empty, empty, empty,
				empty, empty, empty, empty ],
			[ whitePawn, whitePawn, whitePawn, whitePawn,
				whitePawn, whitePawn, whitePawn, whitePawn ],
			[ whiteRook, whiteKnight, whiteBishop, whiteQueen,
				whiteKing, whiteBishop, whiteKnight, whiteRook ],
		]
	}

	
	getPath(src: Position, dest: Position): Position[] {
		let path: Position[] = [];
		if(src == dest) path = [src];
		else if(src.x == dest.x) {
			let dist = Math.abs(dest.y-src.y);
			let dir = (dest.y-src.y) / dist;
			for (let ii = 0; ii <= dist; ii++) {
				path.push({ x: src.x, y: src.y+(ii*dir) });
			}	
		}
		else if (src.y == dest.y) {
			let dist = Math.abs(src.x-dest.x);
			let dir = (dest.x-src.x) / dist;
			for (let ii = 0; ii <= dist; ii++) {
				path.push({ x: src.x+(ii*dir), y: src.y });
			}	
		}
		else if (Math.abs(dest.x-src.x) == Math.abs(dest.y-src.y)) {
			let dist = Math.abs(src.x-dest.x);
			let dirX = (dest.x-src.x) / dist;
			let dirY = (dest.y-src.y) / dist;
			for (let ii = 0; ii <= dist; ii++) {
				path.push({ x: src.x+(ii*dirX), y: src.y+(ii*dirY) });
			}	
		}
		return path;
	}
	 
	isPieceInPath(team: number, path: Position[]): boolean {
		path.pop();
		path.shift();
		if(path.some((pos: Position) => this.getPiece(pos)?.type != Empty.None)) return true;
		return false;
	}

	movePutsInCheck(src: Position, dest: Position): boolean {
		let piece = this.getPiece(src);
		let target = this.getPiece(dest);
		this.board[dest.y][dest.x] = piece;
		this.board[src.y][src.x] = { type: Empty.None };
		let kingPos = { x: -1, y: -1 };
		for (let ii = 0; ii < this.sizeX; ii++) {
			for (let jj = 0; jj < this.sizeY; jj++) {
				let currPos = { x: jj, y: ii }
				if(this.getPiece(currPos).type == PieceType.King && this.getPiece(currPos).team! == piece.team) {
					kingPos = currPos;
				}
			}
		}
		for (let ii = 0; ii < this.sizeX; ii++) {
			for (let jj = 0; jj < this.sizeY; jj++) {
				let currPos = { x: jj, y: ii }
				if(this.getPiece(currPos).type!=Empty.None && this.getPiece(currPos).team != piece.team && this.isMovePossible(currPos, kingPos)) {
					this.board[dest.y][dest.x] = target;
					this.board[src.y][src.x] = piece;
					return true;
				}
			}
		}
		this.board[dest.y][dest.x] = target;
		this.board[src.y][src.x] = piece;
		return false;
	}

	movePiece(src: Position, dest: Position): Board {
		let piece = this.getPiece(src);
		// Ensure the move is valid
		if(!this.isMovePossible(src, dest) || piece.team !== this.currTeam){
			console.error(`InvalidMoveException: Team ${this.currTeam} tried to move from [${src.x}, ${src.y}] to [${dest.x}, ${dest.y}] on move ${this.moveNumber}`);	
			return this;
		}
		let ans = this;

		// Swap the pieces
		ans.board[dest.y][dest.x] = piece;
		ans.board[src.y][src.x] = { type: Empty.None };
		console.log(`Team ${this.currTeam} moved from [${src.x}, ${src.y}] to [${dest.x}, ${dest.y}] on move ${this.moveNumber}`);	

		// Increment move and team counter
		if(piece.type == PieceType.Pawn) {
			ans.pawnsMoved[piece.team!][src.x] = true;
		}
		ans.currTeam += 1;
		ans.currTeam %= this.teams;
		if(piece.team == 0) ans.moveNumber++;
		return ans;
	}

	isMovePossible(src: Position, dest: Position): boolean {
		let { type, team } = this.getPiece(src);
		// if(Object.values(Empty).includes(typeof type)) return false;
		if(dest.x < 0 || dest.y < 0 || dest.x > this.sizeX || dest.y > this.sizeY ) return false;
		if(dest.x == src.x && dest.y == src.y) return false;
		let path = this.getPath(src, dest);
		if(this.getPiece(dest).type != Empty.None && this.getPiece(dest).team == team) return false;
		if(this.isPieceInPath(team!, path)) return false;
		if(this.movePutsInCheck(src, dest)) return false;
		switch (type) {
			case PieceType.King:
				return this.isMovePossibleKing(src, dest);
			case PieceType.Queen:
				return this.isMovePossibleQueen(src, dest);
			case PieceType.Bishop:
				return this.isMovePossibleBishop(src, dest);
			case PieceType.Knight:
				return this.isMovePossibleKnight(src, dest);
			case PieceType.Rook:
				return this.isMovePossibleRook(src, dest);
			case PieceType.Pawn:
				return this.isMovePossiblePawn(team!, src, dest);
			default:
				return false;
		}
	}

	isMovePossibleKing(src: Position, dest: Position): boolean {
		if(Math.abs(dest.x-src.x) > 1 || Math.abs(dest.y-src.y) > 1) return false;
		return true;
	}

	isMovePossibleQueen(src: Position, dest: Position): boolean {
		if(Math.abs(dest.x-src.x) != Math.abs(dest.y-src.y) 
				&& dest.x-src.x != 0 
				&& dest.y-src.y != 0) return false;
		return true;
	}

	isMovePossibleBishop(src: Position, dest: Position): boolean {
		if(Math.abs(dest.x-src.x) != Math.abs(dest.y-src.y)) return false;
		return true;
	}

	isMovePossibleKnight(src: Position, dest: Position): boolean {
		if(Math.abs(dest.x-src.x) == 1 && Math.abs(dest.y-src.y) == 2) return true;
		if(Math.abs(dest.x-src.x) == 2 && Math.abs(dest.y-src.y) == 1) return true;
		return false;
	}

	isMovePossibleRook(src: Position, dest: Position): boolean {
		if(dest.x-src.x != 0 
				&& dest.y-src.y != 0) return false;
		return true;
	}

	isMovePossiblePawn(team: number, src: Position, dest: Position): boolean {
		// TODO en-passant
		let piece = this.getPiece(src);
		let capture = this.getPiece(dest);
		if(dest.y-src.y == team * (2) - 1 
				&& Math.abs(dest.x-src.x) == 1 
				&& capture.type != Empty.None
				&& capture.type != Empty.InvalidSquare
				&& capture.team != team
			) return true; // Capture
		if(capture.type != Empty.None) return false;
		if(dest.y-src.y == 2*(team * (2) - 1) 
				&& dest.x-src.x == 0 
				&& !this.pawnsMoved[team][src.x]
			) return true;
		if(dest.y-src.y == team * (2) - 1 && dest.x-src.x == 0) return true;
		return false;
	}
}

export default StandardBoard;
