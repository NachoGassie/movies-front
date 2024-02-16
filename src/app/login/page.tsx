'use client'

import { HookFormInput } from "@/components";
import { useLoginForm } from "@/hooks";
import { useState } from "react";
import { FaEyeSlash as Hidden, FaEye as Showed } from "react-icons/fa";
import styles from './login.module.css';

export default function Login(){
  const { 
    errors, 
    isPending, 
    handleSubmit, 
    onSubmit, 
    register, 
  } = useLoginForm();

  const [hidePW, setHidePW] = useState(true);

  const EyeIcon = () => (
    <span onClick={() => setHidePW(!hidePW)} className={styles.passwordEye}>
      { hidePW ? <Hidden /> : <Showed /> }
    </span>
  );

  return (
    <section className='formContainer'>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>

        <HookFormInput label="Email" field="email" type="email" errors={errors} register={register}/>

        <HookFormInput 
          label="Password" 
          field="password" 
          type={hidePW ? 'password' : 'text'}
          errors={errors} 
          register={register}
        >
          <EyeIcon/>
        </HookFormInput>

        <input 
          type="submit" 
          value={ isPending ? 'Iniciando...' : 'Iniciar Sesion' }
          className='submit'
        />

      </form>
    </section>
  );
}