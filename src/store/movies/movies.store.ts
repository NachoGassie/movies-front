import { AdaptedMovie } from '@/model/movie';
import { create } from 'zustand';
 
interface MovieState {
  movieToUpdate: AdaptedMovie | null;
}
interface MovieAction {
  setMovieToUpdate: (x: AdaptedMovie) => void;
  clearMovieToUpdate: () => void;
}

const initialState: MovieState = {
  movieToUpdate: null,
}

export const useMoviesStore = create<MovieState & MovieAction>()((set) => ({
  ...initialState,

  setMovieToUpdate: (movieToUpdate: AdaptedMovie) => {
    set({
      movieToUpdate: {...movieToUpdate, poster: ''}
    });
  },

  clearMovieToUpdate: () => set({movieToUpdate: null}),
}));