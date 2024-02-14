'use client'
import { useMoviesStore } from '@/store/movies/movies.store';
import { AiFillCloseCircle as CloseBtn } from 'react-icons/ai';
import styles from './modal.module.css';
import useOutClick from '@/hooks/global/useOutClick';

interface Props {
  children: React.ReactNode;
}

export default function Modal({ children }: Props){

  const showModal = useMoviesStore(state => state.showModal);
  const closeModal = useMoviesStore(state => state.toggleModal);
  const modalRef = useOutClick(closeModal);

  return(
    <>
      {
        showModal && 
        <div className={styles.overlay}>

          <div className={styles.modalContainer} ref={modalRef}>

            { children } 

            <button 
              className={styles.btnClose}
              onClick={closeModal}
            >
              <CloseBtn className={styles.btnIcon}/>
            </button>

          </div>
        </div>
      }
    </>
  );
}