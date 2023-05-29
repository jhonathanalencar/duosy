import "dotenv/config";
import express from "express";
import cors from "cors";

import { gameRouter, adRouter, discordRouter, authRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);

app.use(gameRouter);
app.use(adRouter);
app.use(discordRouter);
app.use(authRouter);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
