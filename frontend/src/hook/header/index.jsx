import { AiFillHome } from "react-icons/ai";
import styles from './styles.module.css'
import { Link } from "react-router-dom";

function Header(){
    

    return(
        
        <header>
        <div className={styles.Titulo}>
        <Link className={styles.Titulo} to='/home' >
        <AiFillHome className={styles.Icon} />
          <h1> Software Preserve</h1>
        </Link>
        </div>
        </header>
    )
}

export default Header