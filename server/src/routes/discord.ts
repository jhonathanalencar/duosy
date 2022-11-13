import express from 'express';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

export const discordRouter = express.Router();

discordRouter.get('/ads/:id/discord', async (request, response) =>{
  const getDiscordParams = z.object({
    id: z.string(),
  });

  const { id } = getDiscordParams.parse(request.params);

  try{
    const ad = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
        name: true,
      },
      where: {
        id,
      }
    });

    return response.status(200).json({
      discord: ad.discord,
      name: ad.name,
    });
  }catch(error){
    return response.status(404).json({
      "message": "No ad found.",
    });
  }
});