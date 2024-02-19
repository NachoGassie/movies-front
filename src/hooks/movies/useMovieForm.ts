import { MutateMovie } from "@/model";
import { mutateMovieSchema, newMovieSchema } from "@/schemas/movie/movie.schemas";
import { useMoviesStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutateMovie } from "./useMovies";

export default function useMovieForm(){
  const movieToUpdate = useMoviesStore(state => state.movieToUpdate);
  const isUpdate = !!movieToUpdate;
  const zodSchema = isUpdate ? mutateMovieSchema : newMovieSchema;
  const defaultMovie = movieToUpdate ?? {}

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<MutateMovie>({
    resolver: zodResolver(zodSchema),
    defaultValues: defaultMovie
  });


  const { mutate } = useMutateMovie(isUpdate);

  const onSubmit: SubmitHandler<MutateMovie> = (data) => {
    mutate(data);
    // reset();
  };

  return {
    errors,
    isUpdate,
    handleSubmit, 
    onSubmit, 
    register, 
  }
}