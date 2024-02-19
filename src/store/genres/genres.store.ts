import { AdaptedGenre } from "@/model/genre/genre.model";
import { create } from "zustand";

interface GenreState {
  genreToDelete: AdaptedGenre | null;
  showMenu: boolean;
}
interface GenreActions{
  toggleMenu: () => void;
  setGenreToDelete: (genre: AdaptedGenre) => void;
  clearGenreToDelete: () => void;
}

const initialState: GenreState = {
  genreToDelete: null,
  showMenu: false,
}

export const useGenreStore = create<GenreState & GenreActions>()((set, get) => ({
  ...initialState,

  setGenreToDelete: (genreToDelete: AdaptedGenre) => set({ genreToDelete }),
  clearGenreToDelete: () => set({ genreToDelete: null }),

  toggleMenu: () => set({ showMenu: !get().showMenu }),
  
}))
