import express from 'express';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

export const gameRouter = express.Router();

gameRouter.get('/games', async (request, response) =>{
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
    return response.status(404).json({
      "message": "No games found.",
    });
  }
});

gameRouter.post('/games', async (request, response) =>{
  const createGameBody = z.object({
    id: z.string(),
    title: z.string(),
    boxArtUrl: z.string().url(),
  });

  const body = createGameBody.parse(request.body);
  
  try{
    const existingGame = await prisma.game.findUnique({
      where: {
        id: body.id,
      }
    });

    if(existingGame){
      return response.status(409).json({
        "message": "This game is already registered!",
      });
    }

    const game = await prisma.game.create({
      data:{
        id: body.id,
        title: body.title,
        boxArtUrl: body.boxArtUrl,
      }
    });

    return response.status(201).json(game);
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
