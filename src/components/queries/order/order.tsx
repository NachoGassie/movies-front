import { orderByFields } from '@/constants/movie.constants';
import { MovieOrder } from '@/model/movie';
import { useMoviesStore } from '@/store/movies';
import { ChangeEvent } from 'react';
import styles from './order.module.css';

export default function Order(){

  // const selectedOrder = useMoviesStore(state => state.query.order);
  const setOrder = useMoviesStore(state => state.setOrder);

  const handleOrder = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value as MovieOrder);
  } 

  return (
    <select className={styles.select} onChange={handleOrder}>
      {
        orderByFields.map((order, index) => (
          <option 
            key={index} 
            value={order.value}
            // selected={order.value === selectedOrder}
          >
            {order.name}
          </option>
        ))
      }
    </select>
  );
}