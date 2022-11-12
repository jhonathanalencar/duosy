export type AdType = {
  id:  string;
  gameId:  string;
  twitchId: string;
  name:  string;
  yearsPlaying: number;
  discord :  string
  weekDays:  number[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  createdAt: Date;
}