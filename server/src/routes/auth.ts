import express from 'express';
import axios from 'axios';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const authRouter = express.Router();

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const AUTHORIZATION_SERVER_TOKEN_URL = process.env.AUTHORIZATION_SERVER_TOKEN_URL;

authRouter.post('/token', async (request, response) =>{
  const getAccessTokenQuery = z.object({
    code: z.string(),
    client_id: z.string(),
    redirect_uri: z.string(),
  });

  const { code, client_id, redirect_uri } = getAccessTokenQuery.parse(request.query);

  try{
    const data = await axios.post(`${AUTHORIZATION_SERVER_TOKEN_URL}?client_id=${client_id}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${redirect_uri}`);
   
    response.status(200).json(data.data);
  }catch(err){
    return response.status(500).json({
      "message": "Something went wrong.",
    });
  }

})