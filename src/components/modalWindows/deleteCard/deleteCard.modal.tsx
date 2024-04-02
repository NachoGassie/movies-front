'use client'

import { useModalStore } from "@/store/useModal";
import styles from './deleteCard.module.css';

interface Props {
  handleDelete: () => void;
  confirmationText: string | JSX.Element;
}

export default function DeleteCard({handleDelete, confirmationText}: Props){
  const closeModal = useModalStore(state => state.closeModal);

  return (
    <div className={styles.deleteCardContainer}>
      <div className={styles.text}>
        { confirmationText }
      </div>

      <div className={styles.btnContainer}>

        <button 
          className={`${styles.btn} ${styles.delete}`} 
          onClick={handleDelete}
        >
          Eliminar
        </button>

        <button 
          className={`${styles.btn} ${styles.cancel}`} 
          onClick={closeModal}
        >
          Cancelar
        </button>
        
      </div>
    </div>
  );
}