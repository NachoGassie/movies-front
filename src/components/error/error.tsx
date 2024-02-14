import styles from './error.module.css';

interface Props{
  text: string;
}

export default function DefaultError({ text }: Props){
  return(
    <h4 className={styles.errorText}>
      { text }
    </h4>
  );
}