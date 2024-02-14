'use client'

import { useMoviesStore } from "@/store";
import styles from './deleteCard.module.css';
import { useDeleteMovie } from "@/hooks";

export default function DeleteMovie(){
  const movieToDelete = useMoviesStore(state => state.movieToDelete);
  const toggleModal = useMoviesStore(state => state.toggleModal);
  const deleteMovie = useDeleteMovie();

  const handleDelete = () => {
    if (movieToDelete) {
      deleteMovie.mutate(movieToDelete.id);
      toggleModal();
    }
  }

  return movieToDelete && (
    <div className={styles.deleteCardContainer}>
      <div className={styles.text}>
        ¿ Está seguro que desea eliminar 
          <span className={styles.titulo}> {movieToDelete.titulo}</span> ? 

      </div>

      <div className={styles.btnContainer}>

        <button 
          className={`${styles.btn} ${styles.delete}`} 
          onClick={handleDelete}
        >
          Eliminar
        </button>

        <button 
          className={`${styles.btn} ${styles.cancel}`} 
          onClick={toggleModal}
        >
          Cancelar
        </button>
        
      </div>
    </div>
  );
}