import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useSelector } from 'react-redux';
import { CircleNotch, X } from 'phosphor-react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { selectUser } from '../redux/features/user/userSlice';
import { useGetDiscordQuery } from '../redux/features/games/gamesSlice';

import { SendWhisperModal } from './';

interface DiscorModalProps{
  adId: string;
  twitchId: string;
  handleCloseModal: () => void;
}

export function DiscordModal({ 
  adId,
  twitchId, 
  handleCloseModal 
}: DiscorModalProps){
  const {
    data: adInfo,
    isLoading,
  } = useGetDiscordQuery(adId);

  const { user } = useSelector(selectUser);

  const [isSending, setIsSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function handleSendWhisper(message: string){
    if(!user){ return; }
    
    try{
      setIsSending(true);

      await axios.post(`https://api.twitch.tv/helix/whispers?from_user_id=${user.id}&to_user_id=${twitchId}`, {
        message,
      }, {
        headers: {
          'Client-Id': import.meta.env.VITE_TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${user.accessToken}`,
        },
      });
      
      toast('Message sent', {
        type: 'success',
      });
      
    }catch(error: any){
      if(error instanceof AxiosError){
        if(error.response?.data.message === 'the sender does not have a verified phone number'){
          toast(
            'Message could not be sent. You must have a verified phone number.', {
            type: 'error',
          });
        }else if(error.response?.data.message === "The recipient's settings prevent this sender from whispering them"){
          toast(
            'Message could not be sent. The user block whispers from strangers.', {
            type: 'error',
          });
        }else{
          toast('Message could not be sent', {
            type: 'error',
          });
        }
      }else{
        toast('Message could not be sent', {
          type: 'error',
        });
      }
    }finally{
      setIsSending(false);
    }
  }

  function handleCopyToClipboard(){
    if(!adInfo){ return; }

    navigator.clipboard.writeText(adInfo.discord);

    toast('Discord code copied to clipboard', {
      type: 'info',
    });

    handleCloseModal();
  }

  return(
    <Dialog.Portal>
      <Dialog.Overlay className="flex h-full absolute z-10 inset-0 p-4 bg-duosy-black-500/70 overflow-auto">
        <Dialog.Content className="flex flex-col items-center max-w-fit h-fit bg-duosy-black-400 m-auto p-2 md:p-4 rounded">
          <Dialog.Close className="self-end mb-2">
            <X className="w-5 h-5 text-duosy-blue-400 hover:text-duosy-violet-400 transition-colors" weight="bold" />
          </Dialog.Close> 
          <Dialog.Title className="text-xl font-black text-white">
            <span className="text-duosy-red-400">Let's</span> play
          </Dialog.Title>
          <Dialog.Description className="text-lg font-semibold text-gray-300">
            Add on <span className="text-duosy-blue-400">discord</span>
          </Dialog.Description>

          {isLoading ? (
            <div className="w-full bg-duosy-black-500 rounded p-1 flex item-center justify-center">
              <CircleNotch 
                weight="bold"
                className="w-6 h-6 text-gray-400 animate-spin"
              />
            </div>
          ) : (
            !adInfo ? (
              <div className="w-full bg-duosy-black-500 rounded p-1 flex item-center justify-center">
                <span 
                  className="text-gray-400 font-semibold"
                >
                  Not found
                </span>
              </div>
            ) : (
              <button 
                type="button"
                onClick={handleCopyToClipboard}
                className="w-full bg-duosy-black-500 rounded p-1 text-gray-400 text-center mt-2 cursor-pointer"
              >
                {adInfo.discord}
              </button>
            )
          )}

          {user && adInfo && (
            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
              <Dialog.Trigger
                className="text-gray-200 font-semibold bg-violet-500 hover:bg-violet-600 transition-colors p-1 mt-2 w-full rounded"
              >
                Send Whisper
              </Dialog.Trigger>

              <SendWhisperModal 
                name={adInfo.name}
                handleSendWhisper={handleSendWhisper}
                isLoading={isSending}
              />
            </Dialog.Root>
          )}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}