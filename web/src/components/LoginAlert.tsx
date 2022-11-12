import { useNavigate } from 'react-router-dom';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

export function LoginAlert(){
  const navigate = useNavigate();

  return(
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="absolute inset-0 flex items-center justify-center bg-gray-900/80 p-4">
        <AlertDialog.Content className="bg-duosy-black-400 p-2 rounded sm:p-4">
          <AlertDialog.Title className="text-red-400 font-semibold mb-2 text-lg sm:text-2xl">
            Login Required
          </AlertDialog.Title>
          <AlertDialog.Description className="text-gray-300 sm:text-lg">
            You must be logged in to publish an ad
          </AlertDialog.Description>
          <div className="flex flex-1 justify-between items-center mt-2 sm:mt-6">
            <AlertDialog.Cancel className="bg-gray-500 text-gray-200 py-1 px-2 rounded hover:bg-gray-600 transition-colors">
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action 
              type="button"
              onClick={() => navigate('/login')}
              className="bg-violet-500 text-gray-100 py-1 px-2 rounded hover:bg-violet-600 transition-colors disabled:opacity-60 disabled:hover:bg-violet-500 disabled:cursor-not-allowed"
            >
              Sign In with Twitch
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Overlay>
    </AlertDialog.Portal>
  )
}