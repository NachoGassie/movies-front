'use client'

import { useGenreStore } from "@/store/genres/genres.store";
import { useEffect } from "react";
import { useMoviesStore } from "@/store/movies";
import { usePathname } from "next/navigation";

export default function useGenres(){
  const getGenres = useGenreStore(state => state.getGenres);
  const toggleMenu = useGenreStore(state => state.toggleMenu);
  const genres = useGenreStore(state => state.genres);
  const showMenu = useGenreStore(state => state.showMenu);

  const pathname = usePathname();

  const setIdGenero = useMoviesStore(state => state.setIdGenero);

  useEffect(() => {
    const isGetGenres = (showMenu || pathname === '/addmovie') && genres.length === 0;
    if (isGetGenres) {
      getGenres();
    }
  }, [showMenu, genres.length, pathname]);

  const getMovies = (id: number) => {
    setIdGenero(id);
    toggleMenu();
  }

  return {
    genres,
    getMovies,
  }

}