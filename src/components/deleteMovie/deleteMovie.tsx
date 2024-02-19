'use client'

import { useMoviesStore } from "@/store";
import { useDeleteMovie } from "@/hooks";
import { useModalStore } from "@/store/useModal";
import DeleteCard from "../deleteCard/deleteCard.modal";

export default function DeleteMovie(){
  const movieToDelete = useMoviesStore(state => state.movieToDelete);
  const closeModal = useModalStore(state => state.closeModal);
  const deleteMovie = useDeleteMovie();

  const confirmationText = <p>¿ Está seguro que desea eliminar 
  <span> {movieToDelete?.titulo}</span> ? </p>

  const handleDelete = () => {
    if (movieToDelete) {
      deleteMovie.mutate(movieToDelete.id);
      closeModal();
    }
  }

  return movieToDelete 
  && <DeleteCard 
    handleDelete={handleDelete} 
    confirmationText={confirmationText}
  />;
}