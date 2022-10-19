import { PrismaClient } from '@prisma/client';
import express from 'express';
import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes';
import { convertMinutesToHourString } from './utils/convertMinutesToHourString';

const app = express();

const prisma = new PrismaClient({
  log: ['query'],
});

app.get('/games', async (request, response) =>{
  try{
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          }
        }
      }
    });

    return response.status(200).json(games);
  }catch(error){
    console.log(error);
  }
});

app.post('/games/:id/ads', async (request, response) =>{
  const gameId = request.params.id;
  const body = request.body;

  try{
    const ad = await prisma.ad.create({
      data: {
        gameId,
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
    console.log(error);
  }
});

app.get('/games/:id/ads', async (request, response) =>{
  const gameId = request.params.id;

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
    console.log(error);
  }
});

app.get('/ads/:id/discord', async (request, response) =>{
  const adId = request.params.id;

  try{
    const ad = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      }
    });

    return response.status(200).json({
      discord: ad.discord,
    });
  }catch (error){
    console.log(error);
  }
});

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));