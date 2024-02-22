'use client'

interface Props{
  error: Error;
  reset: () => void;
}

export default function error({ error, reset }: Props){
  return(
    <h4 className='errorText'>
      { error.message }
    </h4>
  );
}