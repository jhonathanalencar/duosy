import "dotenv/config";
import express from "express";
import cors from "cors";

import { gameRouter, adRouter, discordRouter, authRouter } from "./routes";
import { corsOptions } from "./configs/corsOptions";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use(authRouter);
app.use(gameRouter);
app.use(adRouter);
app.use(discordRouter);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
