'use client'

import MovieBoxBtn from "@/components/button/movieBox.btn";
import { AdaptedMovie } from "@/model/movie/movie.model";
import { useAuthStore } from "@/store";
import { useMoviesStore } from "@/store/movies/movies.store";
import { useRouter } from 'next/navigation';
import { useStore } from "zustand";

import styles from './movie.module.css';

interface Props {
  movie: AdaptedMovie;
}

export default function Movie({ movie }: Props){
  const showMovieById = useMoviesStore(state => state.showMovieById);
  const setMovieToDelete = useMoviesStore(state => state.setMovieToDelete);
  const setMovieToUpdate = useMoviesStore(state => state.setMovieToUpdate);
  const isLogged = useStore(useAuthStore, state => state.isLogged);
  
  const router = useRouter();

  const showMore = () => {
    showMovieById(movie);
  }
  const updateMovie = () => {
    setMovieToUpdate(movie);
    router.push('/addmovie');
  }
  const deleteMovie = () => {
    setMovieToDelete(movie);
  }
  
  return(
    <article className={`${styles.container} ${isLogged ? styles.logIn : styles.logOut}`}>
      <h3>{ movie.titulo }</h3>
      <p>{ movie.sinopsis }</p>
      <div className={styles.subData}>
        <p>Genero: { movie.genero }</p>
        -
        <p>Año: { movie.anioLanzamiento }</p>
      </div>


      <div className={styles.btnContainer}>
        <MovieBoxBtn 
          important={true}
          text='ver más' 
          onClick={showMore}
        />

        {
          isLogged && 
          <>
            <MovieBoxBtn 
              text='modificar' 
              onClick={updateMovie}
            />
            <MovieBoxBtn 
              text='eliminar' 
              onClick={deleteMovie}
            />
          </>
        }

      </div>

    </article>
  );
}