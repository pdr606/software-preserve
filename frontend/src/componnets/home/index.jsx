
import { Link } from 'react-router-dom';
import {GiChecklist} from 'react-icons/gi'

import styles from './styles.module.css'
import Header from '../../hook/header';

function Home() {
  return (
    <>
      <main className={styles.Container} >
        <Header/>
        
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
