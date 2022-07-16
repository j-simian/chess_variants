import React from 'react';

import { InGamePageContainer } from "../components/PageContainer/PageContainer";
import BoardView from "../components/BoardView/BoardView";

const MainPage = () => {
	return (
		<InGamePageContainer>
			<BoardView />
		</InGamePageContainer>
	);
};

export default MainPage;
