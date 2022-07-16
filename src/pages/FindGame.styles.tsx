import {TextField} from "@mui/material";
import { styled, Theme } from "@mui/material/styles";

export const OrLabel = styled("p")(({ theme }: { theme: Theme }) => ({
	marginLeft: theme.spacing(2),
	marginRight: theme.spacing(2),
}));

export const GameCodeField = styled(TextField)(({ theme }: { theme: Theme }) => ({
	marginLeft: theme.spacing(1),
	marginRight: theme.spacing(1),
}));
