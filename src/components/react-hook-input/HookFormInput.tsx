import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues>{
  label: string;
  field: Path<T>;
  type?: HTMLInputTypeAttribute;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
}

const HookFormInput = <T extends FieldValues>({ 
  label, field, type = 'text', errors, register
}: InputProps<T>) => (
  <div className='inputContainer'>
    <label>{label}</label>
    <input {...register(field)} type={type} className='mainInput'/>
    {errors[field] && <div className="errorTxt">{errors[field]?.message?.toString()}</div>}
  </div>
);

export default HookFormInput;
