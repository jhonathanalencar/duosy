import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectGameById, useGetAdsQuery, useCreateGameMutation } from '../redux/features/games/gamesSlice';
import { RootState } from '../redux/store';

import { AdCard, ErrorMessage, Loader } from '../components';
import { useGetGameByIdQuery } from '../redux/services/twitch';
import { useEffect } from 'react';

export function FindDuo(){
  const { gameId } = useParams();
  const [createGame, { isLoading: isLoadingCreateGame }] = useCreateGameMutation();

  if(!gameId){
    return <ErrorMessage />;
  }

  const {
    data: ads,
    isLoading,
  } = useGetAdsQuery(gameId);

  const { data: game, isLoading: isLoadingGetGameById } = useGetGameByIdQuery(gameId);

  const existingGame = useSelector((state: RootState) => selectGameById(state, gameId));

  useEffect(() =>{
    if(game && !existingGame){
      try{
        createGame({
          id: game.data[0].id,
          title: game.data[0].name,
          boxArtUrl: game.data[0].box_art_url,
        }).unwrap();
      }catch(error){
        console.log(error);
      }
    }
  }, [game]);

  
  if(isLoading || isLoadingCreateGame || isLoadingGetGameById){
    return <Loader />;
  }

  if(!existingGame || !ads){
    return <ErrorMessage />;
  }

  const properVerb = existingGame._count.ads > 1 ? `ads` : `ad`;
  const formattedBoxArtUrl = existingGame.boxArtUrl.replace('{width}x{height}', '144x192')

  return(
    <section className='w-full min-h-full flex flex-col gap-20 md:gap-32'>
      <header className="w-full h-24 md:h-32 flex gap-4 bg-gradient-to-r from-[#121214] to-transparent relative top-0 left-0 animate-slidedown">
        <div className="w-full absolute bottom-0 left-4 flex gap-4 items-end md:py-4">
          <img 
            src={formattedBoxArtUrl} 
            alt="banner" 
            className="rounded h-32 w-24 md:h-48 md:w-36 object-cover translate-y-1/2 border-2 border-duosy-red-400"
          />
          <div className="flex w-full flex-col items-start pr-8">
            <strong className="text-gray-300 text-base md:text-lg font-extrabold">{existingGame.title}</strong>
            <span className="text-gray-400 font-extrabold">{`${existingGame._count.ads} ${properVerb}`}</span>
          </div>
        </div>
      </header>
      <div className="w-full h-full flex justify-center flex-wrap gap-4 mx-auto max-w-5xl px-4 pt-4 pb-12">
        {ads.length > 0 ? (
          ads.map((ad) =>{
            return(
              <AdCard key={ad.id} ad={ad} />
            )
          })
        ) : (
          <ErrorMessage message="No ads have been published yet" />
        )}
      </div>
    </section>
  )
}