'use client'

import { HookFormInput, SubmitError } from "@/components";
import useGenresForm from "@/hooks/genres/useGenresForm";
import styles from './genreForm.module.css';
import { AdaptedGenre } from "@/model";

interface Props {
  genre?: AdaptedGenre
}

export default function GenreForm({genre}: Props){
  const isUpdate = !!genre;
  const { 
    errors, submitError, handleSubmit, onSubmit, register 
  } = useGenresForm(genre);

  return (
    <section className={styles.genreFormSection}>
      <h5 className={styles.genreFormTitle}>Genero: </h5>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.genreFormContainer}>

        <input type="hidden" {...register('idGenero')}/>

        <HookFormInput field="genero" errors={errors} register={register}/>

        <input 
          type="submit" 
          className={`submit ${styles.submitBtn}`}
          value={isUpdate ? 'Actualizar' : 'Añadir' }
        />

      </form>
      { submitError && <SubmitError msg={submitError.message}/> }
    </section>
  );
}