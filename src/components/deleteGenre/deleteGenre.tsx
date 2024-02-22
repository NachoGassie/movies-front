'use client'

import { useDeleteGenre } from "@/hooks";
import { AdaptedGenre } from "@/model";
import { useModalStore } from "@/store/useModal";
import DeleteCard from "../deleteCard/deleteCard.modal";

interface Props {
  genreToDelete: AdaptedGenre;
}

export default function DeleteGenre({ genreToDelete }: Props){
  const closeModal = useModalStore(state => state.closeModal);
  const deleteGenre = useDeleteGenre();

  const handleDelete = () => {
    if (genreToDelete) {
      deleteGenre.mutate(genreToDelete.idGenero);
      closeModal();
    }
  }

  const confirmationText = <p>¿ Está seguro que desea eliminar el genero
  <span> {genreToDelete?.genero}</span> ? </p>

  return genreToDelete 
  && <DeleteCard 
    handleDelete={handleDelete} 
    confirmationText={confirmationText}
  />;
}