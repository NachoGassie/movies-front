import { sortByFields } from "@/constants/movie.constants";
import { useMoviesStore } from "@/store/movies";
import style from './sort.module.css';

export default function Sort(){

  const activeSort = useMoviesStore(state => state.query.sort);
  const setSort = useMoviesStore(state => state.setSort);

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