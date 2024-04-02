'use client'

import { useDeleteMovie } from "@/hooks";
import { AdaptedMovie } from "@/model";
import { useModalStore } from "@/store/useModal";
import DeleteCard from "../deleteCard/deleteCard.modal";

interface Props {
  movieToDelete: AdaptedMovie;
}

export default function DeleteMovie({ movieToDelete }: Props){
  const closeModal = useModalStore(state => state.closeModal);
  const setComponent = useModalStore(state => state.setComponent);
  const { mutate, error } = useDeleteMovie();

  const confirmationText = <p>¿ Está seguro que desea eliminar 
  <span> {movieToDelete?.titulo}</span> ? </p>

  const handleDelete = () => {

    if (movieToDelete) {
      mutate(movieToDelete.id);

      if (error) {
        setComponent(<p>Error</p>);
      }
      closeModal();
    }
  }

  return movieToDelete 
  && <DeleteCard 
    handleDelete={handleDelete} 
    confirmationText={confirmationText}
  />;
}