import { styled, Theme } from "@mui/material/styles";

import { BoardSquare } from "../../logic/boards/Board";
import BlackKingSvg from "../../assets/pieces/king_black.svg";
import WhiteKingSvg from "../../assets/pieces/king_white.svg";
import BlackQueenSvg from "../../assets/pieces/queen_black.svg";
import WhiteQueenSvg from "../../assets/pieces/queen_white.svg";
import BlackBishopSvg from "../../assets/pieces/bishop_black.svg";
import WhiteBishopSvg from "../../assets/pieces/bishop_white.svg";
import BlackKnightSvg from "../../assets/pieces/knight_black.svg";
import WhiteKnightSvg from "../../assets/pieces/knight_white.svg";
import BlackRookSvg from "../../assets/pieces/rook_black.svg";
import WhiteRookSvg from "../../assets/pieces/rook_white.svg";
import BlackPawnSvg from "../../assets/pieces/pawn_black.svg";
import WhitePawnSvg from "../../assets/pieces/pawn_white.svg";
import { PieceType } from "../../logic/pieces/Piece";

function colormix(x: string, y: string, t = 0.5): string {
	const r =
		parseInt(x.substring(1, 3), 16) * (1 - t) +
		parseInt(y.substring(1, 3), 16) * t;
	const g =
		parseInt(x.substring(3, 5), 16) * (1 - t) +
		parseInt(y.substring(3, 5), 16) * t;
	const b =
		parseInt(x.substring(5, 7), 16) * (1 - t) +
		parseInt(y.substring(5, 7), 16) * t;
	return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}

const BoardCellStyled = styled("div", {
	shouldForwardProp: (prop) => prop !== "colour" && prop !== "highlight",
})<{ colour: number; highlight: boolean }>(
	({
		theme,
		colour,
		highlight,
	}: {
		theme: Theme;
		colour: number;
		highlight: boolean;
	}) => {
		let thisColour = (
			colour == 0
				? theme.palette.secondary.light
				: theme.palette.secondary.dark
		)!;
		thisColour = !highlight
			? thisColour
			: colormix(thisColour, "#ffffff", 0.8);
		return {
			width: theme.spacing(8),
			height: theme.spacing(8),
			backgroundColor: thisColour,
			display: "inline-block",
		};
	}
);

export const PieceStyled = styled("div", {
	shouldForwardProp: (prop) => prop !== "piece",
})<{ piece: BoardSquare }>(
	({ theme, piece }: { theme: Theme; piece: BoardSquare }) => ({
		backgroundImage: `url(${getImage(piece)})`,
		backgroundSize: `${theme.spacing(8)}`,
		height: theme.spacing(8),
		width: theme.spacing(8),
		position: "relative",
		top: theme.spacing(0),
	})
);

function getImage(piece: BoardSquare) {
	switch (piece.type as PieceType) {
		case PieceType.King:
			return piece.team == 0 ? WhiteKingSvg : BlackKingSvg;
		case PieceType.Queen:
			return piece.team == 0 ? WhiteQueenSvg : BlackQueenSvg;
		case PieceType.Bishop:
			return piece.team == 0 ? WhiteBishopSvg : BlackBishopSvg;
		case PieceType.Knight:
			return piece.team == 0 ? WhiteKnightSvg : BlackKnightSvg;
		case PieceType.Rook:
			return piece.team == 0 ? WhiteRookSvg : BlackRookSvg;
		case PieceType.Pawn:
			return piece.team == 0 ? WhitePawnSvg : BlackPawnSvg;
	}
}

export default BoardCellStyled;
