import { genresAdapter } from "@/adapter/genre.adapter";
import { AdaptedGenre } from "@/model/genre/genre.model";
import { create } from "zustand";

const baseUrl = 'http://localhost:3040/api/v1/genres';

interface GenreState {
  genres: AdaptedGenre[];
  showMenu: boolean;
}

interface GenreActions{
  getGenres: () => Promise<void>;
  toggleMenu: () => void;
}

export const useGenreStore = create<GenreState & GenreActions>()((set, get) => ({
  genres: [],
  showMenu: false,

  getGenres: async() => {
    const res = await fetch(baseUrl);
    const json = await res.json();

    const genres = genresAdapter(json.genres);

    set({ genres });
  },

  toggleMenu: () => set(({ showMenu: !get().showMenu })),
  
}))
