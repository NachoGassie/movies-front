import { AdaptedGenre } from "@/model";
import { useModalStore } from "@/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutateGenre } from "./useGenres";

export default function useMovieForm(genreToUpdate?: AdaptedGenre){
  const isUpdate = !!genreToUpdate;
  const defaultGenre = genreToUpdate ?? {}
  const closeModal = useModalStore(state => state.closeModal);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<AdaptedGenre>({
    defaultValues: defaultGenre
  });

  const { mutate, isSuccess, isPending, error: submitError } = useMutateGenre(isUpdate);

  const onSubmit: SubmitHandler<AdaptedGenre> = (data) => {
    mutate(data);
    if (isSuccess) closeModal();
  };

  return {
    errors,
    submitError,
    handleSubmit, 
    onSubmit, 
    register, 
  }
}