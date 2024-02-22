'use client'

import { useState } from "react";
import NavLink from "./components/links";
import Menu from "./components/menu";
import styles from './header.module.css';

export default function Header(){
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return(
    <header className={ styles.header }>
      <NavLink toggleMenu={toggleMenu} showMenu={showMenu}/>
      {
        showMenu && <Menu toggleMenu={toggleMenu} />
      }
    </header>
  );
}