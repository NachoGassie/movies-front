'use client'

import { useGenreStore } from "@/store/genres";
import NavLink from "./components/links";
import Menu from "./components/menu";
import styles from './header.module.css';

export default function Header(){
  const showMenu = useGenreStore(state => state.showMenu);

  return(
    <header className={ styles.header }>
      <NavLink />
      {
        showMenu && <Menu />
      }
      
    </header>
  );
}