'use client'
import { useAuthStore, useGenreStore, useMoviesStore, useStore } from "@/store";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import styles from '../header.module.css';

export default function NavLink(){

  const toggleMenu = useGenreStore(state => state.toggleMenu);
  const showMenu = useGenreStore(state => state.showMenu);

  const closeSession = useAuthStore(state => state.closeSession);
  const isLogged = useStore(useAuthStore, state => state.isLogged);

  const clearMovieToUpdate = useMoviesStore(state => state.clearMovieToUpdate);

  // const resetForm = () => clearMovieToUpdate();
  

  return(
    <ul className={ styles.headerList }>

      <li> 
        {
          showMenu 
          ? <IoIosClose 
              onClick={toggleMenu}
              className={styles.closeBurger}
            />
          : <IoMenu 
              onClick={toggleMenu}
              className={styles.burger}
            />
        }
      </li>

      <li>
        <Link href='/'>Peliculas</Link>
      </li>

      {
        isLogged
        ? <> 
          <li>
            <Link href='/addmovie'>
              <span onClick={() => clearMovieToUpdate()}>Agregar Pelicula</span>
            </Link>
          </li>

          <li onClick={closeSession}>
            <Link href='/'>Cerrar sesion</Link>
          </li>
        </>
        : <li>
          <Link href='/login'>Iniciar Sesión</Link>
        </li>
      }
    </ul>
  );
}