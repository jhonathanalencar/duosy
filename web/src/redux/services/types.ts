export type Game = {
  id: string;
  box_art_url: string;
  name: string;
}

export type GetTopGamesResponse = {
  data: Game[];
}

export type GetGamesByNameResponse = {
  data: Game[];
}

export type GetGameByIdResponse = {
  data: Game[];
}