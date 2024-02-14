import { AdaptedMovie } from "@/model";
import { movieSchema } from "@/schemas/movie/movie.schemas";
import { useMoviesStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateMovie, useUpdateMovie } from "./useMovies";

export default function useMovieForm(){
  const movieToUpdate = useMoviesStore(state => state.movieToUpdate);
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<AdaptedMovie>({
    resolver: zodResolver(movieSchema),
    defaultValues: movieToUpdate ?? {}
  });

  const fn = movieToUpdate ? useUpdateMovie() : useCreateMovie();

  const onSubmit: SubmitHandler<AdaptedMovie> = (data: AdaptedMovie) => {
    fn.mutate(data);
  };

  return {
    errors,
    isUpdate: !!movieToUpdate,
    handleSubmit, 
    onSubmit, 
    register, 
  }
}