import { defaultIdGenero, defaultMovieQuery } from '@/constants/movie.constants';
import { AdaptedMovie, MovieOrder, MovieQueryParams, MovieSort } from '@/model/movie';
import { create } from 'zustand';

interface State {
  movieToDelete: AdaptedMovie | null;
  movieToShow: AdaptedMovie | null;
  movieToUpdate: AdaptedMovie | null;
  query: MovieQueryParams; 
  showModal: boolean;
  idGenero: number;
}

interface Action {
  showMovieById: (x: AdaptedMovie) => void;
  setMovieToDelete: (x: AdaptedMovie) => void;
  setMovieToUpdate: (x: AdaptedMovie) => void;
  clearMovieToUpdate: () => void;
  toggleModal: () => void;
  setPag: (x: number) => void;
  setOrder: (x: MovieOrder) => void;
  setSort: (x: MovieSort) => void;
  setIdGenero: (x: number) => void;
}

export const useMoviesStore = create<State & Action>()((set, get) => ({
  movieToDelete: null,
  movieToShow: null,
  movieToUpdate: null,
  query: {
    pag: defaultMovieQuery.pag,
    limit: defaultMovieQuery.limit,
    sort: defaultMovieQuery.sort,
    order: defaultMovieQuery.order
  },
  showModal: false,
  idGenero: defaultIdGenero,

  showMovieById: (movie: AdaptedMovie) => {
    set({ 
      showModal: true, 
      movieToShow: movie, 
      movieToDelete: null,
    });
  },
  setMovieToDelete: (movie: AdaptedMovie) => {
    set({ 
      showModal: true, 
      movieToDelete: movie,
      movieToShow: null, 
    });
  },
  
  setMovieToUpdate: (movieToUpdate: AdaptedMovie) => {
    set({
      movieToUpdate: {...movieToUpdate, poster: ''}
    })
  },

  clearMovieToUpdate: () => set({movieToUpdate: null}),

  toggleModal: () => set({showModal: !get().showModal}),

  setPag: (pag: number) => set({query: {...get().query, pag}}),

  setOrder: (order: MovieOrder) => set({query: {...get().query, order}}),

  setSort: (sort: MovieSort) => set({query: {...get().query, sort}}),

  setIdGenero: (idGenero: number) => set({idGenero}),
}));