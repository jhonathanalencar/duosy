interface ErrorMessageProps{
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps){
  return(
    <div className="w-full flex justify-center items-center">
      <h1 className="font-bold text-xl lg:text-2xl text-center text-white mt-16 self-start">
        {message ?? 'Something went wrong. Please try again.'}
      </h1>
    </div>
  )
}