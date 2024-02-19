'use client'

import { defaultIdGenero } from '@/constants/movie.constants';
import { useGetAllGenres, useMovieQueries } from '@/hooks';
import useOutClick from '@/hooks/global/useOutClick';
import { useAuthStore, useGenreStore, useModalStore, useMoviesStore, useStore } from '@/store';
import { MdDeleteForever } from "react-icons/md";
import styles from '../header.module.css';
import { AdaptedGenre } from '@/model';

export default function Menu(){
  const toggleMenu = useGenreStore(state => state.toggleMenu);
  const openModal = useModalStore(state => state.openModal);
  const setGenreToDelete = useGenreStore(state => state.setGenreToDelete);
  const { setIdGen } = useMovieQueries();
  const clearMovieToDelete = useMoviesStore(state => state.clearMovieToDelete);
  const clearMovieToShowById = useMoviesStore(state => state.clearMovieToShowById);

  const { genres } = useGetAllGenres();
  const isLogged = useStore(useAuthStore, state => state.isLogged);
  const menuRef = useOutClick(toggleMenu);

  const getMovies = (id: number) => {
    setIdGen(id);
    toggleMenu();
  }

  const deleteGenre = (genre: AdaptedGenre) =>{ 
    setGenreToDelete(genre);
    clearMovieToShowById();
    clearMovieToDelete();
    toggleMenu();
    openModal();
  }
  
  return (
    <div className={styles.deployedMenu} ref={menuRef}>
      <h4 className={styles.menuTitle}>Peliculas por Genero</h4>
      <ul className={styles.list}>

        <li onClick={() => getMovies(defaultIdGenero)} className={styles.menuItem}>
          <span>All</span>
        </li>
        {
          genres.map(genre => (
            <li 
              className={styles.menuItem}
              key={genre.idGenero}
            >
              <span onClick={() => getMovies(genre.idGenero)}>
                {genre.genero}
              </span>

              {
                isLogged &&
                <MdDeleteForever 
                  onClick={() => deleteGenre(genre)}
                  className={styles.menuItemDelete}
                />
              }
            </li>
          ))
        }
      </ul>

    </div>
  );
}