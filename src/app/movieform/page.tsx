'use client'

import { HookFormInput, SubmitError } from "@/components";
import { useGetAllGenres } from "@/hooks";
import useMovieForm from "@/hooks/movies/useMovieForm";

function AddMovie(){

  const { 
    errors, isUpdate, submitError, handleSubmit, onSubmit, register 
  } = useMovieForm();
  const { genres } = useGetAllGenres();

  return(

    <section className='formContainer'>

      <form onSubmit={handleSubmit(onSubmit)} className='form'>

        <input type="hidden" {...register('id')}/>

        <HookFormInput label="Titulo" field="titulo" errors={errors} register={register}/>
      
        <HookFormInput label="Sinopsis" field="sinopsis" errors={errors} register={register}/>
      
        <HookFormInput label="Año de Lanzamiento" field="anioLanzamiento" errors={errors} register={register}/>

        <div className="inputContainer">

          <label>Genero</label>

          <select {...register("idGenero")} className='mainSelect'>
            <optgroup label="Seleccione un genero">
              {
                (genres as any).map((genre: any ) => (
                  <option key={genre.idGenero} value={genre.idGenero}>
                    {genre.genero}
                  </option>
                ))
              }
            </optgroup>

          </select>
          {errors.idGenero && <div className="errorTxt">{errors.idGenero.message}</div>}

        </div>

        <HookFormInput 
          label={`Poster ${isUpdate ? '(agregue solo si desea actualizarlo)' : ''}`} 
          field="poster" 
          errors={errors} 
          register={register}
          type="file"
        />

        <input 
          type="submit" 
          className='submit'
          value={isUpdate ? 'Actualizar' : 'Añadir' }
        />
      </form>
      { submitError && <SubmitError msg={submitError.message}/> }
    </section>
  );
}

export default AddMovie;