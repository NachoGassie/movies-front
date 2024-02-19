'use client'
import { useGetAllMovies } from "@/hooks/movies/useMovies";
import { useState } from "react";
import styles from './pagination.module.css';

export default function Pagination(){
  const { fetchNextPage, hasNextPage } = useGetAllMovies();
  const [noMore, setNoMore] = useState(false);

  const handleClick = () => {
    if (hasNextPage) {
      fetchNextPage();
      if (noMore) setNoMore(false);
    }
    else setNoMore(true);
  }

  return (
    <>
      {
        noMore 
        ? <h4 className={styles.pagEndTxt}>Es todo por ahora...</h4>
        : <button 
            onClick={handleClick}
            className={`mainButton ${styles.pagBtn}`}
          >
          <span> Cargar Más </span>
        </button>
      }
    </>
  );
}