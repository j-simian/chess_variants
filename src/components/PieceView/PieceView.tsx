import React from "react";
import { PieceType } from "../../logic/pieces/Piece";
import PieceObject from "./PieceView.styles";

interface PieceViewProps {
	piece: PieceType;
}

const PieceView = ({ piece }: PieceViewProps) => {
	return <PieceObject />;
};

export default PieceView;
