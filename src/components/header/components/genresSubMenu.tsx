import { AdaptedGenre } from "@/model";
import { LuPenSquare } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import styles from '../header.module.css';

interface Props {
  genres: AdaptedGenre[];
  isLogged?: boolean;
  getMovies: (id: number) => void;
  updateGenre: (g: AdaptedGenre) => void;
  deleteGenre: (g: AdaptedGenre) => void;
}


export default function GenresSubMenu(
  { genres, isLogged, getMovies, updateGenre, deleteGenre }: Props
){
  return(
    <>
      {
        genres.map(genre => (
          <li 
            className={styles.menuItem}
            key={genre.idGenero}
          >
            <span onClick={() => getMovies(genre.idGenero)}>
              {genre.genero}
            </span>

            {
              isLogged &&
              <div>
                <LuPenSquare 
                  title='editar'
                  onClick={() => updateGenre(genre)}
                  className={styles.menuItemFn}
                />
                <MdDeleteForever 
                  title='eliminar'
                  onClick={() => deleteGenre(genre)}
                  className={styles.menuItemFn}
                />

              </div>
            }
          </li>
        ))
      }
    </>
  );
}