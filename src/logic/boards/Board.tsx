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

	abstract teams: number;
	sizeX: number = 0;
	sizeY: number = 0;

	// Current state
	moveNumber: number = 0;
	currTeam: number = 0;

	constructor() {
		this.initBoard();
	}


	// Initialisers

	/**
	 * Initialises the board to a default state.
	 */
	abstract initBoard(): void;

	/**
	 * Initialises the board to an empty state.
	 */
	abstract emptyBoard(): void;

	
	// Getters

	/**
	 * Gives us the type and team of a piece on a given square
	 * @param pos: position - the position of the piece to return
	 * @return BoardSquare - an object with the team and type of a piece
	 */
	abstract getPiece(pos: Position): BoardSquare;

	/**
	 * Returns a list of positions in between the two given
	 * @param src: position - the position of the piece to return
	 * @param dest: position - the position of the target square
	 * @return Position[] - a list of positions
	 */
	abstract getPath(src: Position, dest: Position): Position[];

	/**
	 * States whether a given position is checkmate for a given team
	 * @param team: number - the team id of the team to check checkmate for.
	 * @return boolean - true if game is checkmate for team
	 */
	abstract isPositionCheckmate(team: number): boolean;



	// Setters

	/**
	 * Check the move is valid and if so moves the piece at src to dest.
	 * @param src: Position - the position of the piece to move
	 * @param dest: Position - the target position
	 */
	abstract movePiece(src: Position, dest: Position): Board;

	
	// Move Legality
	
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

	/**
	 * States if a there are any pieces blocking the movement of a piece on a path.
	 * @param team: number - the team attempting to move on the path.
	 * @param path: Position[] - a path. usually the first and last position are ignored as these are the initial and capture positions.
	 * @return boolean - if there is a piece that would prevent a move being made.
	 */
	abstract isPieceInPath(team: number, path: Position[]): boolean;

	/**
	 * States if the move would cause the player of said move to go into check.
	 * @param src: Position - the position of the piece to move
	 * @param dest: Position - the target position
	 * @return boolean - whether the move puts the player into check or not.
	 */
	abstract movePutsInCheck(src: Position, dest: Position): boolean;

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
