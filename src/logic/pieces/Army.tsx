import Piece from "./Piece";
import { cloneDeep } from "lodash";

export function mirrorPosition(pieces: Piece[]): Piece[] {
	const piecesCopy: Piece[] = [];
	pieces.forEach((p) => piecesCopy.push(cloneDeep(p)));
	const mirrored = piecesCopy.map((p) => {
		p.position = { x: p.position.x, y: 7 - p.position.y };
		return p;
	});
	return mirrored;
}

export default class Army {
	pieces: Piece[] = [];
	team: number;

	constructor(team: number, pieces: Piece[]) {
		this.team = team;
		this.pieces = pieces;
		pieces.forEach((p) => (p.team = this.team));
	}
}
