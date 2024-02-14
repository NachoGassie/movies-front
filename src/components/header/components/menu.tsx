'use client'

import { defaultIdGenero } from '@/constants/movie.constants';
import { useGenres } from '@/hooks';
import useOutClick from '@/hooks/global/useOutClick';
import { useGenreStore } from '@/store';
import styles from '../header.module.css';

export default function Menu(){
  const { genres, getMovies } = useGenres();
  const toggleMenu = useGenreStore(state => state.toggleMenu);
  const menuRef = useOutClick(toggleMenu);
  
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
              onClick={() => getMovies(genre.idGenero)}
              className={styles.menuItem}
              key={genre.idGenero}
            >
              <span>{genre.genero}</span>
            </li>
          ))
        }
      </ul>

    </div>
  );
}