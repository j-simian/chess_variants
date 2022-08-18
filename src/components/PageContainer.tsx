import { styled, Theme } from "@mui/material/styles";

const PageContainer = styled("div")(({ theme }: { theme: Theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "100vh",
	width: "100%",
	backgroundColor: theme.palette.custom.bg,
	overflow: "none",
}));

export const FindGamePageContainer = styled(PageContainer)``;
export const InGamePageContainer = styled(PageContainer)``;

export default PageContainer;
