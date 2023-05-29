import express from "express";
import axios from "axios";
import { z } from "zod";

export const authRouter = express.Router();

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const AUTHORIZATION_SERVER_TOKEN_URL =
  process.env.AUTHORIZATION_SERVER_TOKEN_URL;

authRouter.post("/token", async (request, response) => {
  const getAccessTokenQuery = z.object({
    code: z.string(),
    client_id: z.string(),
    redirect_uri: z.string(),
  });

  const { code, client_id, redirect_uri } = getAccessTokenQuery.parse(
    request.query
  );

  try {
    const data = await axios.post(
      `${AUTHORIZATION_SERVER_TOKEN_URL}?client_id=${client_id}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${redirect_uri}`
    );

    response.status(200).json(data.data);
  } catch (err) {
    return response.status(500).json({
      message: "Something went wrong.",
    });
  }
});

authRouter.get("/auth/authorize", async (request, response) => {
  try {
    const accessTokenResponse = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "client_credentials",
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { access_token } = accessTokenResponse.data;

    response.status(200).json({ access_token });
  } catch (error) {
    console.error(error);
    const statusCode = 500;
    const message = "Something went wrong.";

    if (error instanceof axios.AxiosError) {
      return response
        .status(error.response?.status ?? statusCode)
        .json(error.response?.data ?? { error: message });
    }

    return response.status(statusCode).json({
      error: message,
    });
  }
});
