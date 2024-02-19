import { AdaptedMovie } from '@/model/movie';
import { create } from 'zustand';
 
interface MovieState {
  movieToDelete: AdaptedMovie | null;
  movieToShow: AdaptedMovie | null;
  movieToUpdate: AdaptedMovie | null;
}
interface MovieAction {
  showMovieById: (x: AdaptedMovie) => void;
  setMovieToDelete: (x: AdaptedMovie) => void;
  setMovieToUpdate: (x: AdaptedMovie) => void;
  clearMovieToUpdate: () => void;
}

const initialState: MovieState = {
  movieToDelete: null,
  movieToShow: null,
  movieToUpdate: null,
}

export const useMoviesStore = create<MovieState & MovieAction>()((set, get) => ({
  ...initialState,

  showMovieById: (movieToShow: AdaptedMovie) => {
    set({ 
      movieToDelete: null,
      movieToShow, 
    });
  },
  setMovieToDelete: (movieToDelete: AdaptedMovie) => {
    set({ 
      movieToShow: null, 
      movieToDelete,
    });
  },

  setMovieToUpdate: (movieToUpdate: AdaptedMovie) => {
    set({
      movieToUpdate: {...movieToUpdate, poster: ''}
    });
  },

  clearMovieToUpdate: () => set({movieToUpdate: null}),

}));