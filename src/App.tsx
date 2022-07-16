import React, { useState } from 'react';

import { ThemeProvider } from "@mui/material/styles";

import theme from "./Theme"
import FindGamePage from './pages/FindGame';
import MainPage from './pages/Main';

enum AppPage {
	FindGame,
	InGame,
	Results
}




function App() {
	var [ state, setState ] = useState<AppPage>(AppPage.FindGame);

	function joinGame(code: string) {
		setState(AppPage.InGame);	
		console.log(`Joining game: ${code}`);
	}

	function choosePage(state: AppPage) {
		const findGamePage = <FindGamePage joinGame={joinGame} />
		const mainPage = <MainPage />
		switch(state) {
			case AppPage.FindGame:
				return findGamePage;
			case AppPage.InGame:
				return mainPage;
			default:
				return findGamePage;
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<div className="app-container">
				{ choosePage(state) }	
			</div>
		</ThemeProvider>
	);
}

export default App;
