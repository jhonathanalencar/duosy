import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { MagnifyingGlassPlus } from 'phosphor-react';

import { selectUser } from '../redux/features/user/userSlice';

import { PublishAdForm } from './PublishAdForm';
import { LoginAlert } from './';

export function PublishAdBanner(){
  const { user } = useSelector(selectUser);

  const [isOpen, setIsOpen] = useState(false);

  return(
    <div className="w-full rounded rounded-b-lg pt-1 bg-gradient-to-r from-duosy-blue-400 to-duosy-violet-400 shadow-sm">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-duosy-black-400 rounded mb-16">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <strong className="text-white text-lg md:text-xl text-center">Didn't find your duo?</strong>
          <span className="text-zinc-400 text-base text-center">Publish an ad to find new players!</span>
        </div>
        {user ? (
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger 
              type="button" 
              className="flex items-center gap-2 bg-duosy-violet-400 hover:bg-violet-500 transition-colors py-2 px-4 rounded outline-none"
            >
              <MagnifyingGlassPlus className="w-6 h-6 text-white" />
              <span className="font-black text-white">Publish ad</span>
            </Dialog.Trigger>
            <PublishAdForm />
          </Dialog.Root>
        ) : (
          <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialog.Trigger
              type="button" 
              className="flex items-center gap-2 bg-duosy-violet-400 hover:bg-violet-500 transition-colors py-2 px-4 rounded outline-none"
            >
              <MagnifyingGlassPlus className="w-6 h-6 text-white" />
              <span className="font-black text-white">Publish ad</span>
            </AlertDialog.Trigger>
            <LoginAlert />
          </AlertDialog.Root>
        )}
      </div>
    </div>
  )
}