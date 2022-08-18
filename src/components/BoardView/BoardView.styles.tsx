import { styled, Theme } from "@mui/material/styles";

export const BoardContainer = styled("div")(({ theme }: { theme: Theme }) => ({
	backgroundColor: theme.palette.secondary.main,
	display: "block",
}));

export const BoardRow = styled("div")(({ theme }: { theme: Theme }) => ({
	display: "block",
	height: theme.spacing(8),
	width: theme.spacing(64),
}));
