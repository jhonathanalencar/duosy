import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';

interface DiscorModalProps{
  discord: string;
}

export function DiscordModal({ discord }: DiscorModalProps){
  function handleCopyToClipboard(){
    navigator.clipboard.writeText(discord);
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
          <button 
            type="button"
            onClick={handleCopyToClipboard}
            className="w-full bg-duosy-black-500 rounded p-1 text-gray-400 text-center mt-2 cursor-pointer"
          >
            {discord}
          </button>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}