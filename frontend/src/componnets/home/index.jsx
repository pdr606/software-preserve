import { BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {GiChecklist} from 'react-icons/gi'
import styles from './styles.module.css'

function Home() {
  return (
    <>
      <main className={styles.Container} >
        <div className={styles.Titulo}>
          <h1>Bem vindo ao Software da Preserve <BsFillGearFill/>  </h1>
        </div>
        <div className={styles.ContainerCard}>
          <div className={styles.Card}>
          <Link className={styles.CardLink} to='/treinamentos/checklist'>Checklist<GiChecklist/></Link>
          </div>
          <div className={styles.Card}>
          <Link className={styles.CardLink} to='/treinamentos/cronograma'>Cronograma<GiChecklist/></Link>
          </div>
          <div className={styles.Card}>
          <Link className={styles.CardLink} to='/treinamentos/orcamento'>Orçamento<GiChecklist/></Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
