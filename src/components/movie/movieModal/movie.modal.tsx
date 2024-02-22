'use client'

import { AdaptedMovie } from '@/model';
import styles from './movieModal.module.css';

interface Props{
  movie: AdaptedMovie | null;
}

export default function MovieModal({ movie }: Props){

  return movie && (
    <>
      <img 
        className={ styles.poster }
        src={ movie.poster } 
        alt={ movie.titulo } 
      />

      <h2 className={styles.titulo}>
        {movie.titulo}
      </h2>

      <div className={styles.data}>
        <h4>género: {movie.genero}</h4>
        -
        <h4>Año: {movie.anioLanzamiento}</h4>
      </div>

      <p>{movie.sinopsis}</p>

    </>
  );
}