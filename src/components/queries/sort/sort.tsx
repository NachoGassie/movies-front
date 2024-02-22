import { sortByFields } from "@/constants/movie.constants";
import useMovieQueries from '@/hooks/movies/useMovieQueries';
import style from './sort.module.css';

export default function Sort(){

  const setSort = useMovieQueries().setSort;
  const activeSort = useMovieQueries().activeSort;
  
  return(
    <div className={style.sortContainer}>
      {
        sortByFields.map((sort, index) => (
          <div key={index} className={style.sort}>

            <label 
              htmlFor={sort} 
              className={style.label}
            >
              {sort}
            </label>

            <input
              id={sort}
              defaultChecked = { sort === activeSort }
              onChange={() => setSort(sort)}
              type="radio" 
              name="movieSort" 
            />
          </div>

        ))
      }
    </div>
  );
}