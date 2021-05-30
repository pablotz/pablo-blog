import {useRouter} from 'next/router'
import styles from '../styles/Toolbar.module.css'

const Toolbar = () => {
    const router = useRouter();
    return (
        <div className={styles.main}>
            <div onClick={() => router.push('/')}>Inicio</div>
            <div onClick={() => window.location.href = 'https://www.facebook.com/pablo.hernandezcontreras.9'}>Facebook</div>
            <div>Github</div>
        </div>
    )
}

export default Toolbar
