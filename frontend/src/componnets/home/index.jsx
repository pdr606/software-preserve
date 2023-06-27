import { Link } from "react-router-dom";
import { GoChecklist } from "react-icons/go";
import { MdViewTimeline, MdOutlineAttachMoney } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";

import styles from "./styles.module.css";
import Header from "../../hook/header";

function Home() {
  return (
    <>
      <main className={styles.Container}>
        <Header />
        <div className={styles.Menu}>
          <h2>- Menu do sistema -</h2>
        </div>

        <div className={styles.ContainerCard}>
          <div className={styles.Card}>
            <GoChecklist className={styles.Icon} />
            <Link className={styles.CardLink} to="/treinamentos/checklist">
              Checklist
            </Link>
          </div>
          <div className={styles.Card}>
            <MdViewTimeline className={styles.Icon} />
            <Link className={styles.CardLink} to="/treinamentos/cronograma">
              Cronograma
            </Link>
          </div>
          <div className={styles.Card}>
            <MdOutlineAttachMoney className={styles.Icon} />
            <Link className={styles.CardLink} to="/treinamentos/orcamento">
              Orçamento
            </Link>
          </div>
          <div className={styles.Card}>
            <TbCertificate className={styles.Icon} />
            <Link className={styles.CardLink} to="/treinamentos/certificados">
              Certificado
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
