import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CircleNotch, X } from 'phosphor-react';
import { toast } from 'react-toastify';

interface SendWhisperModalProps{
  handleSendWhisper: (message: string) => Promise<void>;
  name: string;
  isLoading: boolean;
}

export function SendWhisperModal({
  name,
  handleSendWhisper,
  isLoading,
}: SendWhisperModalProps){
  const [message, setMessage] = useState('');

  async function handleSendMessage(){
    if(!message.trim()){
      return toast('Please type a message', {
        type: 'warning',
      });
    }
    
    await handleSendWhisper(message)
      .then(() =>{
        setMessage('');
      });
  }

  return(
    <Dialog.Portal>
      <Dialog.Overlay className="flex h-full absolute z-10 inset-0 p-4 bg-duosy-black-500/70 overflow-auto">
        <Dialog.Content className="flex flex-col items-center max-w-fit h-fit bg-duosy-black-400 m-auto p-2 md:p-4 rounded">
          <Dialog.Close className="self-end mb-2">
            <X className="w-5 h-5 text-duosy-violet-400 hover:text-duosy-violet-300 transition-colors" weight="bold" />
          </Dialog.Close> 
          <Dialog.Title className="text-xl font-black text-white">
            <span className="text-duosy-red-400">Let's</span> play
          </Dialog.Title>
          <Dialog.Description className="text-lg font-semibold text-center text-gray-300">
            Send a message to <span className="text-duosy-blue-400">{name}</span> on <span className="text-duosy-violet-400">twitch</span>
          </Dialog.Description>
          <input 
            type="text"
            className="w-full bg-duosy-black-500 rounded p-1 text-gray-400 mt-2"
            placeholder="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={isLoading}
            className="flex items-center justify-center disabled:opacity-70 disabled:bg-violet-600 disabled:cursor-not-allowed text-gray-200 font-semibold bg-violet-500 hover:bg-violet-600 transition-colors p-1 mt-2 w-full rounded"
          >
            {isLoading ? (
              <CircleNotch weight="bold" className="h-6 w-6 text-gray-300 animate-spin" />
            ) : 'Send'}
          </button>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}