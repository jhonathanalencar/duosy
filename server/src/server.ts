import "dotenv/config";
import express from "express";
import cors from "cors";

import { gameRouter, adRouter, discordRouter, authRouter } from "./routes";
import { corsOptions } from "./configs/corsOptions";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(gameRouter);
app.use(adRouter);
app.use(discordRouter);

app.all("*", (request, response) => {
  response.status(404);

  if (request.accepts("json")) {
    response.json({ message: "404 Not Found" });
  } else {
    response.type("txt").send("404 Not Found");
  }
});

const PORT = process.env.PORT ?? 3333;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
