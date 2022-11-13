import express from 'express';
import { z } from 'zod';

import { prisma } from '../lib/prisma';
import { convertHourStringToMinutes } from '../utils/convertHourStringToMinutes';
import { convertMinutesToHourString } from '../utils/convertMinutesToHourString';

export const adRouter = express.Router();

adRouter.get('/games/:id/ads', async (request, response) =>{
  const getGameAdsParams = z.object({
    id: z.string(),
  });

  const { id: gameId } = getGameAdsParams.parse(request.params);

  try{
    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
        createdAt: true,
        discord: true,
        twitchId: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return response.status(200).json(ads.map((ad) =>{
      return{
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      }
    }));
  }catch(error){
    return response.status(404).json({
      "message": "No ads found.",
    });
  }
});

adRouter.post('/games/:id/ads', async (request, response) =>{
  const createAdParams = z.object({
    id: z.string(),
  });

  const createAdBody = z.object({
    twitchId: z.string(),
    name: z.string(),
    yearsPlaying: z.number(),
    discord: z.string(),
    weekDays: z.number().array(),
    hourStart: z.string(),
    hourEnd: z.string(),
    useVoiceChannel: z.boolean(),
  });

  const { id: gameId } = createAdParams.parse(request.params);
  
  try{
    const body = createAdBody.parse(request.body);

    const ad = await prisma.ad.create({
      data: {
        gameId,
        twitchId: body.twitchId,
        name: body.name,
        yearsPlaying: body.yearsPlaying,
        discord: body.discord,
        weekDays: body.weekDays.join(','),
        hourStart: convertHourStringToMinutes(body.hourStart),
        hourEnd: convertHourStringToMinutes(body.hourEnd),
        useVoiceChannel: body.useVoiceChannel,
      }
    });

    return response.status(201).json(ad);
  }catch(error){
    if(error instanceof z.ZodError){
      if(error.issues[0].message === 'Required'){
        return response.status(400).json({
          "message": `Please provide ${error.issues[0].path[0]}.`,
        });
      }

      return response.status(400).json({
        "message": `Invalid value for ${error.issues[0].path[0]}.`,
      });
    }

    return response.status(500).json({
      "message": "The operation could not be completed.",
    });
  }
});