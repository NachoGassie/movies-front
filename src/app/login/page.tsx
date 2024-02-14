'use client'

import { EmaiValidationRule } from "@/constants";
import { useLoginForm } from "@/hooks";
import { useState } from "react";
import { FaEye as Showed, FaEyeSlash as Hidden } from "react-icons/fa";
import styles from './login.module.css';
import DefaultError from "@/components/error/error";

export default function Login(){
  const { 
    errors, 
    isPending, 
    handleSubmit, 
    onSubmit, 
    register, 
  } = useLoginForm();

  const [hidePW, setHidePW] = useState(true);

  return (
    <section className='formContainer'>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>

        <div className='inputContainer'>
          <label htmlFor="">Email</label>
          <input {...register('email')} type="text" />
          {errors.email && <div className="errorTxt">{errors.email.message}</div>}

        </div>

        <div className='inputContainer'>
          <label htmlFor="">Password</label>
          <input {...register('password')} type={hidePW ? 'password' : 'text'} />

          <span onClick={() => setHidePW(!hidePW)} className={styles.passwordEye}>
            { hidePW ? <Hidden /> : <Showed /> }
          </span>

          {errors.password && <p className="errorTxt">{errors.password.message}</p>}
        </div>

        <input 
          type="submit" 
          value={ isPending ? 'Iniciando...' : 'Iniciar Sesion' }
          className='submit'
        />

      </form>
    </section>
  );
}