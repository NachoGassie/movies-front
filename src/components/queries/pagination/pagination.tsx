import { useGetAllMovies } from "@/hooks/movies/useMovies";
import styles from './pagination.module.css';

export default function Pagination(){
  const { fetchNextPage, hasNextPage } = useGetAllMovies();

  return (
    <>
      {
        hasNextPage 
        ? <button 
            onClick={() => fetchNextPage()}
            className={`mainButton ${styles.pagBtn}`}
          >
            <span> Cargar Más </span>
          </button>
        : <h4 className={styles.pagEndTxt}>Es todo por ahora...</h4>
      }
      
    </>
  );
}