import { AdaptedGenre } from "@/model/genre/genre.model";
import { create } from "zustand";

interface GenreState {
  genreToDelete: AdaptedGenre | null;
}
interface GenreActions{
  setGenreToDelete: (genre: AdaptedGenre) => void;
  clearGenreToDelete: () => void;
}

const initialState: GenreState = {
  genreToDelete: null,
}

export const useGenreStore = create<GenreState & GenreActions>()((set, get) => ({
  ...initialState,

  setGenreToDelete: (genreToDelete: AdaptedGenre) => set({ genreToDelete }),
  clearGenreToDelete: () => set({ genreToDelete: null }),
}));
