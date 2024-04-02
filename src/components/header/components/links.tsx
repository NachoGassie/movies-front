'use client'

import { useAuthStore, useMoviesStore, useStore } from "@/store";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import styles from '../header.module.css';
import { useRouter } from "next/navigation";

interface Props {
  showMenu: boolean;
  toggleMenu: () => void;
}

export default function NavLink({ toggleMenu, showMenu }: Props){
  const router = useRouter();

  const isLogged = useStore(useAuthStore, state => state.isLogged);
  const closeSession = useAuthStore(state => state.closeSession);
  const clearMovieToUpdate = useMoviesStore(state => state.clearMovieToUpdate);


  const logOut = () => {
    closeSession();
    router.push('/');
  }

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
      <Link href='/'>
        Inicio
      </Link>
    </li>

    {
      isLogged
      ? <> 
        <li>
          <Link href='/movieform'>
            <span onClick={clearMovieToUpdate}>Agregar Pelicula</span>
          </Link>
        </li>

        <li onClick={logOut}>
          Cerrar sesion
        </li>
      </>
      : <>
        <li>
          <Link href='/login'>Iniciar Sesión</Link>
        </li>
        <li>
          <Link href='/signup'>Registrarse</Link>
        </li>
      </>
    }
      

    </ul>
  );
}