'use client'

import { useDeleteGenre } from "@/hooks";
import { AdaptedGenre } from "@/model";
import { useModalStore } from "@/store/useModal";
import { useEffect } from "react";
import DeleteCard from "../deleteCard/deleteCard.modal";
import ErrorTxt from "../error/errorTxt";

interface Props {
  genreToDelete: AdaptedGenre;
}

export default function DeleteGenre({ genreToDelete }: Props){
  const setComponent = useModalStore(state => state.setComponent);
  const closeModal = useModalStore(state => state.closeModal);
  const { mutateAsync, isError } = useDeleteGenre();

  useEffect(() => {
    if (isError) {
      const { genero } = genreToDelete;
      setComponent(<ErrorTxt msg={`No fue posible eliminar el genero ${genero}`}/>, 3000);
      setTimeout(() => closeModal(), 3000)
    }
  },[isError]);

  const handleDelete = async () => {
    await mutateAsync(genreToDelete.idGenero);
    closeModal();
  }

  const confirmationText = <p>¿ Está seguro que desea eliminar el genero
  <span> {genreToDelete?.genero}</span> ? </p>

  return genreToDelete 
  && <DeleteCard 
    handleDelete={handleDelete} 
    confirmationText={confirmationText}
  />;
}