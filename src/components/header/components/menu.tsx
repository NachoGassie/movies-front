'use client'
import { DeleteGenre, GenreForm } from '@/components';
import { defaultIdGenero } from '@/constants/movie.constants';
import { useGetAllGenres, useMovieQueries } from '@/hooks';
import useOutClick from '@/hooks/global/useOutClick';
import { AdaptedGenre } from '@/model';
import { useAuthStore, useModalStore, useStore } from '@/store';
import { MdOutlineAddBox } from "react-icons/md";
import styles from '../header.module.css';
import GenresSubMenu from './genresSubMenu';

interface Props {
  toggleMenu: () => void;
}

export default function Menu({ toggleMenu }: Props){
  const setIdGen = useMovieQueries().setIdGen;
  const setComponent = useModalStore(state => state.setComponent);

  const { genres } = useGetAllGenres();
  const isLogged = useStore(useAuthStore, state => state.isLogged);
  const menuRef = useOutClick(toggleMenu);

  const getMovies = (id: number) => {
    setIdGen(id);
    toggleMenu();
  }

  const addGenre = () => {
    setComponent(<GenreForm />);
    toggleMenu();
  }

  const updateGenre = (genre: AdaptedGenre) => {
    setComponent(<GenreForm genre={genre}/>);
    toggleMenu();
  }

  const deleteGenre = (genre: AdaptedGenre) =>{ 
    setComponent(<DeleteGenre genreToDelete={genre}/>);
    toggleMenu();
  }
  
  return (
    <div className={styles.deployedMenu} ref={menuRef}>
      <h4 className={styles.menuTitle}>Peliculas por Genero</h4>
      <ul className={styles.list}>

        <li onClick={() => getMovies(defaultIdGenero)} className={styles.menuItem}>
          <span>All</span>
          {
            isLogged && 
            <MdOutlineAddBox
              title='agregar'
              className={styles.menuItemFn}
              onClick={() => addGenre()} 
            />
          }
        </li>

        <GenresSubMenu
          genres={genres}
          isLogged={isLogged}
          getMovies={getMovies}
          updateGenre={updateGenre}
          deleteGenre={deleteGenre}
        />
        
      </ul>

    </div>
  );
}