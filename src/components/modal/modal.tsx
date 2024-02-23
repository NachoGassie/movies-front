'use client'
import useOutClick from '@/hooks/global/useOutClick';
import { useModalStore } from '@/store/useModal';
import { AiFillCloseCircle as CloseBtn } from 'react-icons/ai';
import styles from './modal.module.css';
import { useEffect } from 'react';


export default function Modal(){

  const showModal = useModalStore(state => state.showModal);
  const closeModal = useModalStore(state => state.closeModal);
  const component = useModalStore(state => state.component);
  const timeOut = useModalStore(state => state.timeOut);
  const modalRef = useOutClick(closeModal);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      }
    }
  },[showModal]);

  useEffect(() => {
    if(timeOut)
      setTimeout(() => closeModal(), 3000);
  },[]);

  return(
    <>
      {
        showModal && 
        <div className={styles.overlay}>

          <div className={styles.modalContainer} ref={modalRef}>

            { component  } 

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