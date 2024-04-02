'use client'

import { Loader, Movie, Order, Pagination, Sort } from "@/components";
import { useGetAllMovies } from "@/hooks";
import styles from "./page.module.css";
import withAuth from "@/components/authComponent";

function Home() {
  const { movies, isLoading } = useGetAllMovies();

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
        movies?.length === 0
        ? <p className={styles.noMoviesTxt}>No hay peliculas disponibles</p>
        : <>       
          <section className={styles.moviesContainer}>
            {
              movies?.map((movie) => (
                <Movie key={movie.id} movie={movie}/>
              ))
            }

          </section>
          <Pagination />
        </>
      }

    </>
  );
}

export default withAuth(Home);
// export default Home;