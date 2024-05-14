'use client'

import { EyeIcon, HookFormInput, SubmitError } from "@/components";
import { useLoginForm } from "@/hooks";
import { useState } from "react";

function Login(){
  
  const { 
    errors, isPending, submitError, handleSubmit, onSubmit, register, 
  } = useLoginForm();
  const [hidePW, setHidePW] = useState(true);

  return (
    <section className='formContainer'>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>

        <HookFormInput label="Email" field="email" type="email" errors={errors} register={register} />

        <HookFormInput 
          label="Password" 
          field="password" 
          type={hidePW ? 'password' : 'text'}
          errors={errors} 
          register={register}
        >
          <EyeIcon hidePW={hidePW} setHidePW={setHidePW}/>
        </HookFormInput>

        <input 
          type="submit" 
          value={ isPending ? 'Iniciando...' : 'Iniciar Sesion' }
          className='submit'
        />

      </form>
      { submitError && <SubmitError msg={submitError.message}/> }
    </section>
  );
}

export default Login;