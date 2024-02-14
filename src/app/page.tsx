'use client'
import { DeleteMovie, Loader, Modal, Movie, MovieModal, Order, Pagination, Sort } from "@/components";
import DefaultError from "@/components/error/error";
import { useGetAllMovies } from "@/hooks";
import styles from "./page.module.css";

export default function Home() {
  const { 
    movies,
    isLoading,
    error,
  } = useGetAllMovies();

  if (error) return <DefaultError text={error.message}/>
  if (isLoading) return <Loader />


  return (
    <>
      <div className={styles.upSection}>
        <h1 className={styles.title}>WatchList</h1> 

        <div className={styles.queryContainer}>
          <Sort />
          <Order />
        </div>

      </div>

      {
        movies.length === 0
        ? <p className={styles.noMoviesTxt}>No hay peliculas disponibles</p>
        :<>       
          <section className={styles.moviesContainer}>
            {
              movies?.map((movie) => (
                <Movie key={movie.id} movie={movie}/>
              ))
            }

            <Modal>
              <DeleteMovie />
              <MovieModal />
            </Modal>

          </section>
          <Pagination />
        </>
      }
    </>
  );
}
