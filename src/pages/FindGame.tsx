import React from "react";

import { Button } from "@mui/material";

import { OrLabel, GameCodeField } from "./FindGame.styles";
import { FindGamePageContainer } from "../components/PageContainer";

type FindGameProps = {
	joinGame: (code: string) => void;
};

const FindGamePage = ({ joinGame }: FindGameProps) => {
	return (
		<FindGamePageContainer>
			<GameCodeField
				id="game-code"
				label="Enter a game code:"
				variant="outlined"
			/>
			<Button variant="contained" onClick={(e) => joinGame("")}>
				Join Game
			</Button>
			<OrLabel>{"or..."}</OrLabel>
			<Button variant="contained" onClick={(e) => joinGame("BOTGAME")}>
				Play against Bot
			</Button>
		</FindGamePageContainer>
	);
};

export default FindGamePage;
