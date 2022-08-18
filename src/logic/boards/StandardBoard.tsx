import Board, {
	getPosition,
	Empty,
	BoardSquare,
	Position,
	getNotation,
} from "./Board";
import Piece, { PieceType } from "../pieces/Piece";
import King from "../pieces/King";
import Queen from "../pieces/Queen";
import Pawn from "../pieces/Pawn";
import Bishop from "../pieces/Bishop";
import Knight from "../pieces/Knight";
import Rook from "../pieces/Rook";
import Army, { mirrorPosition } from "../pieces/Army";

class StandardBoard extends Board {
	private board: BoardSquare[][] = [[]];
	teams = 2;
	sizeX = 8;
	sizeY = 8;

	constructor() {
		super();
		this.initBoard();
	}

	emptyBoard() {
		this.armies = [];
		const empty = Empty.None;
		this.board = [
			[empty, empty, empty, empty, empty, empty, empty, empty],
			[empty, empty, empty, empty, empty, empty, empty, empty],
			[empty, empty, empty, empty, empty, empty, empty, empty],
			[empty, empty, empty, empty, empty, empty, empty, empty],
			[empty, empty, empty, empty, empty, empty, empty, empty],
			[empty, empty, empty, empty, empty, empty, empty, empty],
			[empty, empty, empty, empty, empty, empty, empty, empty],
			[empty, empty, empty, empty, empty, empty, empty, empty],
		];
	}

	initBoard() {
		const white = new Army(0, [
			new King(0, getPosition("e1")),
			new Queen(0, getPosition("d1")),
			new Rook(0, getPosition("a1")),
			new Rook(0, getPosition("h1")),
			new Bishop(0, getPosition("c1")),
			new Bishop(0, getPosition("f1")),
			new Knight(0, getPosition("b1")),
			new Knight(0, getPosition("g1")),
			new Pawn(0, getPosition("a2")),
			new Pawn(0, getPosition("b2")),
			new Pawn(0, getPosition("c2")),
			new Pawn(0, getPosition("d2")),
			new Pawn(0, getPosition("e2")),
			new Pawn(0, getPosition("f2")),
			new Pawn(0, getPosition("g2")),
			new Pawn(0, getPosition("h2")),
		]);
		const black = new Army(1, mirrorPosition(white.pieces));
		this.emptyBoard();
		this.armies.push(white);
		this.armies.push(black);
		for (const t of this.armies) {
			for (const p of t.pieces) {
				this.setPiece(p.position, p);
			}
		}
	}

	getPiece(pos: Position): BoardSquare {
		if (pos.x < 0 || pos.y < 0 || pos.x > 7 || pos.y > 7) {
			return Empty.InvalidSquare;
		}
		return this.board[pos.y][pos.x];
	}

	setPiece(pos: Position, piece: Piece) {
		const target = this.getPiece(pos);
		if (piece.position.x !== -1 && piece.position.y !== -1) {
			this.board[piece.position.y][piece.position.x] = new Piece(-1, {
				x: -1,
				y: -1,
			});
		}
		this.board[pos.y][pos.x] = piece;
		if (target.type !== 0) {
			target.position = { x: -1, y: -1 };
			target.setRanges({ x: -1, y: -1 }); // Clears the targets movement and capturing range
		}
		if (piece.type === 0) return;
		piece.position = pos;
		piece.setRanges(pos);
	}

	getPath(src: Position, dest: Position): Position[] {
		let path: Position[] = [];
		if (src == dest) path = [src];
		else if (src.x == dest.x) {
			const dist = Math.abs(dest.y - src.y);
			const dir = (dest.y - src.y) / dist;
			for (let ii = 0; ii <= dist; ii++) {
				path.push({ x: src.x, y: src.y + ii * dir });
			}
		} else if (src.y == dest.y) {
			const dist = Math.abs(src.x - dest.x);
			const dir = (dest.x - src.x) / dist;
			for (let ii = 0; ii <= dist; ii++) {
				path.push({ x: src.x + ii * dir, y: src.y });
			}
		} else if (Math.abs(dest.x - src.x) == Math.abs(dest.y - src.y)) {
			const dist = Math.abs(src.x - dest.x);
			const dirX = (dest.x - src.x) / dist;
			const dirY = (dest.y - src.y) / dist;
			for (let ii = 0; ii <= dist; ii++) {
				path.push({ x: src.x + ii * dirX, y: src.y + ii * dirY });
			}
		}
		return path;
	}

	isPositionCheck(team: number): boolean {
		const king = this.armies[team].pieces.find(
			(p) => p.type == PieceType.King
		);
		for (const a of this.armies) {
			if (a.team != team) {
				for (const p of a.pieces) {
					if (p.deliversCheck(king!.position, this)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	isPositionCheckmate(team: number): boolean {
		if (!this.isPositionCheck(team)) return false;
		for (const a of this.armies) {
			if (a.team == team) {
				for (const p of a.pieces) {
					if (p.moveRange != []) {
						return false;
					}
				}
			}
		}
		return true;
	}

	movePiece(src: Position, dest: Position, hidden?: boolean): Board {
		const piece = this.getPiece(src);
		// Swap the pieces
		this.setPiece(src, new Piece(-1, { x: -1, y: -1 }));
		this.setPiece(dest, piece);
		piece.movePiece(dest);
		if (hidden != null && hidden) return this;
		console.log(
			`Team ${this.currTeam} moved from ${getNotation(
				src
			)} to ${getNotation(dest)} on move ${this.moveNumber}`
		);
		this.currTeam += 1;
		this.currTeam %= this.teams;
		if (piece.team == 0) this.moveNumber++;
		return this;
	}

	isMovePossible(src: Position, dest: Position): boolean {
		const piece = this.getPiece(src);
		const path = this.getPath(src, dest);
		if (!piece.isMovePossible(this, dest)) return false;
		if (this.isPieceInPath(piece.team, path)) return false;
		if (this.movePutsInCheck(src, dest)) return false;
		return true;
	}

	isPieceInPath(team: number, path: Position[]): boolean {
		path.pop();
		path.shift();
		if (path.some((pos: Position) => this.getPiece(pos)?.type != 0))
			return true;
		return false;
	}

	movePutsInCheck(src: Position, dest: Position): boolean {
		const piece = this.getPiece(src);
		const target = this.getPiece(dest);
		let ans = false;
		this.setPiece(dest, piece);
		this.setPiece(src, new Piece(-1, src));
		ans = this.isPositionCheck(piece.team);
		this.setPiece(src, piece);
		this.setPiece(dest, target);
		return ans;
	}

	isMovePossibleKing(src: Position, dest: Position): boolean {
		return true;
	}

	isMovePossibleQueen(src: Position, dest: Position): boolean {
		return true;
	}

	isMovePossibleBishop(src: Position, dest: Position): boolean {
		return true;
	}

	isMovePossibleKnight(src: Position, dest: Position): boolean {
		return false;
	}

	isMovePossibleRook(src: Position, dest: Position): boolean {
		return true;
	}

	isMovePossiblePawn(team: number, src: Position, dest: Position): boolean {
		// TODO en-passant
		const piece = this.getPiece(src);
		const capture = this.getPiece(dest);
		if (
			dest.y - src.y == team * 2 - 1 &&
			Math.abs(dest.x - src.x) == 1 &&
			capture.type != 0 &&
			capture.team != team
		)
			return true; // Capture
		if (capture.type != 0) return false;
		return true;
	}
}

export default StandardBoard;
