'use client'

import { useGenreStore } from "@/store/genres/genres.store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useMovieQueries from "../movies/useMovieQueries";

export default function useGenres(){
  const getGenres = useGenreStore(state => state.getGenres);
  const toggleMenu = useGenreStore(state => state.toggleMenu);
  const genres = useGenreStore(state => state.genres);
  const showMenu = useGenreStore(state => state.showMenu);

  const pathname = usePathname();
  const { handleIdGen } = useMovieQueries()

  useEffect(() => {
    const isGetGenres = (showMenu || pathname === '/addmovie') && genres.length === 0;
    if (isGetGenres) getGenres();
  }, [showMenu, genres.length, pathname]);

  const getMovies = (id: number) => {
    handleIdGen(id);
    toggleMenu();
  }

  return {
    genres,
    getMovies,
  }
}