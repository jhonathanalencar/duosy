import { useKeenSlider } from 'keen-slider/react';

import { GameCard, Logo, PublishAdBanner } from '../components';

import 'keen-slider/keen-slider.min.css';

export function Home(){
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 1 },

    breakpoints: {
    '(min-width: 350px)': {
      slides: { perView: 2, },
    },
    '(min-width: 550px)': {
      slides: { perView: 3, },
    },
    '(min-width: 750px)': {
      slides: { perView: 4, },
    },
    '(min-width: 900px)': {
      slides: { perView: 5, },
    },
    '(min-width: 1050px)': {
      slides: { perView: 6 },
    },
  },
  });

  const tempGame = {
    id: "21779",
    name: "League of Legends",
    box_art_url: "https://static-cdn.jtvnw.net/ttv-boxart/21779-180x240.jpg"
  }
  return(
    <div className="w-full min-h-full px-4 flex flex-1 flex-col items-center bg-blackGradient">
      <div className="w-full h-full mx-auto max-w-5xl mt-16">
        <Logo />
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wider text-center mb-16">Find the perfect <span className="text-duosy-blue-400">duo</span> for you</h2>
        <div ref={sliderRef} className="keen-slider max-w-5xl mx-auto grid grid-cols-6 gap-2 mb-12">
          <div className="keen-slider__slide flex justify-center">
            <GameCard 
              game={tempGame}
            />
          </div>
          <div className="keen-slider__slide">
            <GameCard 
              game={tempGame}
            />
          </div>
          <div className="keen-slider__slide">
            <GameCard 
              game={tempGame}
            />
          </div>
          <div className="keen-slider__slide">
            <GameCard 
              game={tempGame}
            />
          </div>
          <div className="keen-slider__slide">
            <GameCard 
              game={tempGame}
            />
          </div>
          <div className="keen-slider__slide">
            <GameCard 
              game={tempGame}
            />
          </div>
          <div className="keen-slider__slide">
            <GameCard 
              game={tempGame}
            />
          </div>
        </div>
        <PublishAdBanner />
      </div>
    </div>
  )
}