import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

interface PayloadData{
  code: string;
  scope: string;
  state: string;
}

interface MessageData{
  payload?: PayloadData;
  type: string;
  error?: string;
}

interface User{
  id: string; 
  display_name: string; 
  profile_image_url: string; 
  created_at: string; 
}

function generateState(){
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const typedArray = new Uint8Array(40);
  window.crypto.getRandomValues(typedArray);

  const unicodeCharacterCodeArray = typedArray.map((number) => Number(validChars.codePointAt(number % validChars.length)));

  const state = String.fromCharCode.apply(null, [...unicodeCharacterCodeArray]);

  return state;
}

const OAUTH_STATE_KEY = '@duosy:twitch-oauth2-state-key';
const OAUTH_RESPONSE = '@duosy:oauth2-response';

function saveState(state: string){
  sessionStorage.setItem(OAUTH_STATE_KEY, state);
}

function removeState(){
  sessionStorage.removeItem(OAUTH_STATE_KEY);
}

function openPopup(url: string){
  const height = 700;
  const width = 600;

  const top = 
    window.outerHeight / 2 + window.screenY - height / 2;
  const left = 
    window.outerWidth / 2 + window.screenX - width / 2; 

  return window.open(
    url,
    'OAuth2 Popup',
    `height=${height},width=${width},top=${top},left=${left}`,
  );
}

function closePopup(popupRef: RefObject<Window>){
  if(!popupRef.current){ return };

  popupRef.current.close();
}

interface EnhanceAuthorizeUrlData{
  authorizeUrl: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  state: string;
}

function enhanceAuthorizeUrl({
  authorizeUrl,
  clientId,
  redirectUri,
  scope,
  state
}: EnhanceAuthorizeUrlData){
  return `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
}

interface ObjectToQueryData{
  client_id: string;
  code: string;
  redirect_uri: string;
}

function objectToQuery(object: ObjectToQueryData){
  return new URLSearchParams({...object}).toString();
}

interface ExchangeCodeForTokenData{
  serverUrl: string;
	clientId: string;
	code: string;
	redirectUri: string;
}

function formatExchangeCodeForTokenServerUrl({
  serverUrl,
  clientId,
  code,
  redirectUri,
}: ExchangeCodeForTokenData){
  return `${serverUrl}?${objectToQuery({
    client_id: clientId,
    code,
    redirect_uri: redirectUri,
  })}`;
}

interface UseOAuth2Props{
  authorizeUrl: string;
  clientId: string;
  redirectUri: string;
  scope: string;
}

export function useOAuth({
  authorizeUrl,
  clientId,
  redirectUri,
  scope,
}: UseOAuth2Props){
  const [data, setData] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const popupRef = useRef<Window | null>(null);
  const intervalRef = useRef<number | null>(null);

  let duplicatedMessage: MessageEvent;
  let preventDuplicatedRequest = false;

  async function handleMessageListener(message: MessageEvent<MessageData>){
    duplicatedMessage = message;

    try{
      if(!message.data.type){
        return;
      }

      if(duplicatedMessage.data.type === message.data.type && preventDuplicatedRequest){
        return;
      }

      preventDuplicatedRequest = true;

      const type = message.data.type;
      
      if(type === OAUTH_RESPONSE){
        const error = message.data?.error;
            
        if(error){
          setIsLoading(false);
          setIsError(true);
          setError(error);
        }else{
          const code = message.data.payload?.code;
          
          if(!code){
            setIsLoading(false);
            setIsError(true);
            setError('The operation could not be completed. Code not found.');
            return;
          }

          const exchangeCodeForTokenUrl = formatExchangeCodeForTokenServerUrl({
            serverUrl: `${import.meta.env.VITE_SERVER_URL}token`,
            clientId,
            code,
            redirectUri,
          });
        
          const response = await axios.post(exchangeCodeForTokenUrl);
          
          if(response.statusText !== 'OK'){
            setIsLoading(false);
            setIsError(true);
            setError('The operation could not be completed. Failed to exchange code for token.');
          }else{
            setAccessToken(response.data.access_token);

            const userInfoResponse = await axios.get('https://api.twitch.tv/helix/users', {
              headers: {
                'Authorization': `Bearer ${response.data.access_token}`,
                'Client-Id': clientId,
              }
            });

            setData(userInfoResponse.data.data[0]);
            setIsError(false);
            setError(null);
            setIsSuccess(true);
          }
        }
      }
    }catch(error: any){
      setIsError(true);
      setIsSuccess(false);
      setError('Something went wrong. Please try again.');
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() =>{
    if(data){
      cleanup({intervalRef, popupRef});
    }
  }, [data]);

  useEffect(() =>{
    window.addEventListener('message', handleMessageListener);

    return () =>{
      window.removeEventListener('message', handleMessageListener);
    }
  }, []);

  const getAuth = useCallback(() =>{
    setIsLoading(true);

    const state = generateState();
    saveState(state);

    const authorizeTokenUrl = enhanceAuthorizeUrl({
      authorizeUrl,
      clientId,
      redirectUri,
      scope,
      state,
    });

    popupRef.current = openPopup(authorizeTokenUrl);

    intervalRef.current = setInterval(() =>{
      const popupClosed = !popupRef.current || !popupRef.current.window || popupRef.current.window.closed;

      if(popupClosed){
        setIsLoading(false);

        console.warn('Warning: Popup was closed before completing authentication.');

        if(intervalRef.current){
          clearInterval(intervalRef.current);
        }
        removeState();
      }
    }, 250);
  }, []);

  async function signOut(){
    try{
      setIsLoading(true);
      await axios.post(`https://id.twitch.tv/oauth2/revoke?client_id=${clientId}&token=${accessToken}`);
      
      setIsError(false);
      setError(null);
      setIsSuccess(true);
      setData(null);
      setAccessToken(null);
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  interface CleanupData{
    intervalRef: RefObject<number>;
    popupRef: RefObject<Window>;
  }

  function cleanup(props: CleanupData){
    if(!props.intervalRef.current){ return; }

    clearInterval(props.intervalRef.current);
    closePopup(props.popupRef);
    removeState();
    window.removeEventListener('message', handleMessageListener);
  }

  return {
    getAuth,
    accessToken,
    signOut,
    data,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}