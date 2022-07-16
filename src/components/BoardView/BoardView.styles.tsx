import { styled, Theme } from "@mui/material/styles";

export const BoardContainer = styled("div")(({ theme }: { theme: Theme }) => ({
	backgroundColor: theme.palette.secondary.main,	
	display: "block",
}));

export const BoardCell = styled("div")(({ theme }: { theme: Theme }) => ({
	width: theme.spacing(8),
	height: theme.spacing(8),
	border: `1px solid ${theme.palette.secondary.light}`,
}));

export const BoardRow = styled("div")(({ theme }: { theme: Theme }) => ({
	display: "inline-block",
}));
