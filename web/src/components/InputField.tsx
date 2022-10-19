import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react"

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
}

function InputFieldLabel({ children, ...rest }: InputFieldLabelProps){
  return(
    <label 
      {...rest}
      className="text-base font-semibold text-gray-300"
    >
      {children}
    </label>
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