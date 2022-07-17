import {NumberLiteralType} from "typescript";
import { PieceType } from "../pieces/Piece";

export type Position = { x: number, y: number };

export enum Empty {
	None=0,
	InvalidSquare=-1,
}

export type BoardSquare = {
	type: PieceType | Empty;
	team?: number,
}

abstract class Board {

	protected moveNumber: number = 0;
	protected abstract teams: number;
	protected currTeam: number = 0;
	sizeX: number = 0;
	sizeY: number = 0;

	constructor() {
		this.initBoard();
	}

	abstract initBoard(): void;
	abstract emptyBoard(): void;

	abstract getPiece(pos: Position): BoardSquare;
	abstract getPath(src: Position, dest: Position): Position[];

	/**
	 * Check the move is valid and if so moves the piece at src to dest.
	 * @param src: Position - the position of the piece to move
	 * @param dest: Position - the target position
	 */
	abstract movePiece(src: Position, dest: Position): void;

	/**
	 * States if a move is allowed.
	 * @param src: Position - the position of the piece to move
	 * @param dest: Position - the target position
	 * @return boolean - whether the move is valid or not.
	 */
	abstract isMovePossible(
		src: Position,
		dest: Position
	): boolean;

	abstract isMovePossibleKing(
		src: Position,
		dest: Position
	): boolean;


	abstract isMovePossibleQueen(
		src: Position,
		dest: Position
	): boolean;

	abstract isMovePossibleKnight(
		src: Position,
		dest: Position
	): boolean;
	
	abstract isMovePossibleBishop(
		src: Position,
		dest: Position
	): boolean;

	abstract isMovePossibleRook(
		src: Position,
		dest: Position
	): boolean;

	abstract isMovePossiblePawn(
		team: number,
		src: Position,
		dest: Position
	): boolean;
}

export default Board;
