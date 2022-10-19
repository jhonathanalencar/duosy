import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from "phosphor-react";

export function Checkbox(){
  return(
    <CheckboxPrimitive.Root id="useVoiceChat" className="w-6 h-6 flex items-center justify-center bg-duosy-black-500 rounded outline-none">
      <CheckboxPrimitive.Indicator>
        <Check weight="bold" className="w-5 h-5 text-duosy-red-400" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}