'use client'
import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ErrorTxt } from "..";

interface InputProps<T extends FieldValues>{
  label?: string;
  field: Path<T>;
  type?: HTMLInputTypeAttribute;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  children?: React.ReactNode;
}

const HookFormInput = <T extends FieldValues>({ 
  label, field, type = 'text', errors, register, children
}: InputProps<T>) => {
  return(
    <div className='inputContainer'>
      {label && <label>{label}</label>}
      
      <input {...register(field)} type={type} className='mainInput'/>

      { children }
    
      {errors[field] && <ErrorTxt msg={errors[field]?.message?.toString() ?? ''}/>}
    </div>
  );
};

export default HookFormInput;
