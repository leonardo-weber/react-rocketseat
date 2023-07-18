import styles from '../css/Header.module.css'
import igniteLogo from '../assets/ignite-logo.svg'

export const Header = () => {
    return (
        <header className={styles.header}>
            <img src={igniteLogo} alt={'ignite logo'} />
            <strong> Ignite Feed </strong>
        </header>
    )
}