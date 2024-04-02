import { FaEyeSlash as Hidden, FaEye as Showed } from "react-icons/fa";
import styles from './eyeIcon.module.css';

interface Props{
  hidePW: boolean;
  setHidePW: (x: boolean) => void;
}

const EyeIcon = ({ hidePW, setHidePW }: Props) => {
  return (
    <span onClick={() => setHidePW(!hidePW)} className={styles.eye}>
      { hidePW ? <Hidden /> : <Showed /> }
    </span>
  );  
}

export default EyeIcon;