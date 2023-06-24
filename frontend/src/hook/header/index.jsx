import { AiFillHome } from "react-icons/ai";
import styles from './styles.module.css'
import { Link } from "react-router-dom";

function Header(){
    

    return(
        
        <>
        <div className={styles.Titulo}>
        <Link className={styles.Titulo} to='/home' >
        <AiFillHome className={styles.Icon} />
          <h1> Software Preserve</h1>
        </Link>
        </div>
        </>
    )
}

export default Header