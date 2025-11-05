
import { Link } from 'react-router';
import styles from "@/pages/main/main.module.css";
import Item from '../list/Item';

function SubLayoutPdc({titleName, moreLink, children }) {
    return (
        <section className={`${styles.prd_section} ${styles.best_prd}`}>
            <h2>
                {titleName}
                <Link to={moreLink}>더보기 {">"}</Link>
            </h2>
            
                {children}
            
        </section>
    );
}

export default SubLayoutPdc;