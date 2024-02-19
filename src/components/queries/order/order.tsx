import { orderByFields } from '@/constants/movie.constants';
import useMovieQueries from '@/hooks/movies/useMovieQueries';
import styles from './order.module.css';

export default function Order(){
  const { handleOrder } = useMovieQueries();

  return (
    <select className={styles.select} onChange={handleOrder}>
      {
        orderByFields.map((order, index) => (
          <option 
            key={index} 
            value={order.value}
          >
            {order.name}
          </option>
        ))
      }
    </select>
  );
}