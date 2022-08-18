import { Request, Response } from "express";
import * as path from "path";
import Server from "../../../Server";

export default class ChessServer extends Server {
	get(req: Request, res: Response) {
		const p = req.path.substring(7);
		if (p === "") {
			res.sendFile(
				path.resolve("./apps/chess/build", "index.html")
			);
		} else {
			res.sendFile(path.resolve("./apps/chess/build", p));
		}
	}
}
