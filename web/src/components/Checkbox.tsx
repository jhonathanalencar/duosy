import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from "phosphor-react";

interface CheckboxProps{
  useVoiceChat: boolean;
  setUseVoiceChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Checkbox({useVoiceChat, setUseVoiceChat}: CheckboxProps){
  return(
    <CheckboxPrimitive.Root 
      id="useVoiceChat" 
      name="useVoiceChat"
      className="w-6 h-6 flex items-center justify-center bg-duosy-black-500 rounded outline-none" 
      checked={useVoiceChat} 
      onCheckedChange={(checked) => {
        if(checked === true){
          setUseVoiceChat(true);
        }else{
          setUseVoiceChat(false);
        }
      }}
    >
      <CheckboxPrimitive.Indicator>
        <Check weight="bold" className="w-5 h-5 text-duosy-red-400" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}