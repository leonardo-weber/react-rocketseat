import styles from '../css/Sidebar.module.css'
import { PencilLine } from 'phosphor-react'

export const SideBar = () => {
    return (
        <aside className={styles.sidebar}>

          <img className={styles.cover} src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1206&q=80" />      

            <div className={styles.profile}>

                <img className={styles.avatar} src="https://github.com/leonardo-weber.png" />
                <strong> Leonardo Weber </strong>
                <span>  Developer </span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20} />
                    Editar seu perfil
                </a>
            </footer>

        </aside>
    )
}