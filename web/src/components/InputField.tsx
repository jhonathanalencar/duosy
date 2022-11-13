import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

interface InputFieldRootProps{
  children: ReactNode;
  className?: string;
}

function InputFieldRoot({ children, className }: InputFieldRootProps){
  return(
    <div className={className ? className : 'flex w-full flex-col items-start gap-1'}>
      {children}
    </div>
  )
}

interface InputFieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement>{
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

function InputFieldLabel({ children, className, asChild, ...rest }: InputFieldLabelProps){
  const Comp = asChild ? Slot : 'label';
  return(
    <Comp 
      {...rest}
      className={`text-base font-semibold text-gray-300 ${className ? className : ''}`}
    >
      {children}
    </Comp>
  )
}

interface InputFieldInputProps extends InputHTMLAttributes<HTMLInputElement>{
}

function InputFieldInput({ ...props }: InputFieldInputProps){
  return(
    <input 
      {...props} 
      className="w-full h-10 sm:h-12 py-1 px-2 rounded bg-duosy-black-500 placeholder:text-gray-400 text-gray-300 outline-none" 
    />
  )
}

export const InputField = {
  Root: InputFieldRoot,
  Label: InputFieldLabel,
  Input: InputFieldInput,
}