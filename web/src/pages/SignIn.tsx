import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CircleNotch } from 'phosphor-react';

import { useOAuth } from '../hook/useOAuth';
import { logout, selectUser, setUser } from '../redux/features/user/userSlice';

import { Logo } from '../components';

export function SignIn(){
  const {
    getAuth,
    signOut,
    data,
    isLoading,
    isSuccess,
    isError,
    accessToken,
  } = useOAuth({
    authorizeUrl: 'https://id.twitch.tv/oauth2/authorize',
    clientId: import.meta.env.VITE_TWITCH_CLIENT_ID,
    redirectUri: `${import.meta.env.VITE_APP_URL}/callback`,
    scope: 'channel%3Amanage%3Apolls+channel%3Aread%3Apolls+user%3Amanage%3Awhispers',
  });

  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
 
  function handleSignInWithTwich(){
    getAuth();
  }

  async function handleSignOut(){
    try{
      await signOut();
      dispatch(logout());
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() =>{
    if(data && accessToken){
      dispatch(setUser({...data, accessToken}));
    }
  }, [data]);

  useEffect(() =>{
    if(isError){
      toast(
        'The operation could not be completed. Please try again.', 
        {
          type: 'error',
        }
      );
    }
  }, [isError]);

  useEffect(() =>{
    if(isSuccess){
      toast(
        'Login successful', 
        {
          type: 'success',
        }
      );
    }
  }, [isSuccess]);

  return(
    <div className="h-full flex flex-col items-center justify-center gap-4 max-w-fit mx-auto animate-fade">
      <Logo />

      {user && (
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-16 h-16 overflow-hidden rounded aspect-square bg-gray-700">
            <img 
              className="w-full h-full"
              src={user.profile_image_url} 
              alt="profile image"
            />
          </div>
          <span className="text-md md:text-lg text-gray-400 font-medium">{user.display_name}</span>
        </div>
      )}

      {user ? (
        <button
          className="flex justify-center min-w-[80px] min-h-[36px] bg-rose-700 text-gray-100 text-lg font-semibold py-1 px-2 rounded hover:bg-rose-800 transition-colors disabled:opacity-60 disabled:hover:bg-rose-800 disabled:cursor-not-allowed"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircleNotch weight="bold" className="w-6 h-6 text-gray-300 animate-spin" />
          ) : (
            'sign out'
          )}
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <strong className="text-xl text-gray-300 md:text-3xl mb-6">
            Sign in to Duosy
          </strong>
          <button 
            className="w-full flex items-center justify-center  bg-violet-500 text-gray-100 text-lg font-semibold py-1 px-2 rounded hover:bg-violet-600 transition-colors disabled:opacity-60 disabled:hover:bg-violet-500 disabled:cursor-not-allowed"
            onClick={handleSignInWithTwich}
            disabled={isLoading}
          >
            {isLoading ? (
            <CircleNotch weight="bold" className="w-6 h-6 text-gray-300 animate-spin" />
          ) : (
            'Sign In With Twitch'
          )}
          </button>
        </div>
      )}
    </div>
  )
}