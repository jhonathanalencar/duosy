import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loader } from '../components';

interface PayloadData{
  code: string;
  scope: string;
  state: string;
}

const OAUTH_STATE_KEY = '@duosy:twitch-oauth2-state-key';
const OAUTH_RESPONSE = '@duosy:oauth2-response';

function checkState(receivedState: string){
  const state = sessionStorage.getItem(OAUTH_STATE_KEY);
  return state === receivedState;
}

function queryToObject(query: string){
  const parameters = new URLSearchParams(query);
  return Object.fromEntries(parameters.entries()) as unknown as PayloadData;
}

export function OAuthPopup(){
  const navigate = useNavigate();

  useEffect(() =>{
    const payload = queryToObject(window.location.search.split('?')[1]);

    if(!window.opener){
      return navigate('/');
    }

    if(!payload){
      window.opener.postMessage({
        type: OAUTH_RESPONSE,
        error: 'OAuth error: An error has occured.',
      }, import.meta.env.VITE_APP_URL);
    }else if(checkState(payload.state)){
      window.opener.postMessage({
        type: OAUTH_RESPONSE,
        payload,
      }, import.meta.env.VITE_APP_URL);
    }else{
      window.opener.postMessage({
        type: OAUTH_RESPONSE,
        error: 'OAuth error: State mismatch.',
      }, import.meta.env.VITE_APP_URL);
    }
  }, []);

  return(
    <div>
			<Loader text="logging in..." />
		</div>
  )
}