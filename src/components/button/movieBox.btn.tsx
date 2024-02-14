import styles from './button.module.css';

interface Props{
  text: string;
  important?: boolean;
  onClick?: () => void;
}

function MovieBoxBtn({ text, important, onClick }: Props){
  return (
    <button 
      onClick={onClick}
      className={`mainButton ${important && styles.big}`}
    >
      <span> { text } </span>
    </button>
  );
}

export default MovieBoxBtn;