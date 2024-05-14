'use client'

import { EyeIcon, HookFormInput, SubmitError } from "@/components";
import { useSignupForm } from "@/hooks";
import { useState } from "react";

function SignUp(){
  
  const { 
    errors, isPending, submitError, handleSubmit, onSubmit, register, watch,
  } = useSignupForm();
  const [hidePW, setHidePW] = useState(true);


  return (
    <section className='formContainer'>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>

        <input type="hidden" {...register('idUser')} />

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

        <HookFormInput 
          label="Repeat Password" 
          field="repeatPassword" 
          type={hidePW ? 'password' : 'text'}
          errors={errors} 
          register={register}
        >
          <EyeIcon hidePW={hidePW} setHidePW={setHidePW}/>
        </HookFormInput>

        {/* <input
          {...register("repeatPassword", {
            required: true,
            validate: (val: string) => {
              if (watch('password') != val) {
                return "Your passwords do no match";
              }
            },
          })}
        /> */}

        <input 
          type="submit" 
          value={ isPending ? 'Iniciando...' : 'Registrarse' }
          className='submit'
        />

      </form>
      { submitError && <SubmitError msg={submitError.message}/> }
    </section>
  );
}

export default SignUp;