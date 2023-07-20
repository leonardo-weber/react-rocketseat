import './css/global.css'
import styles from './css/App.module.css'

import { Header } from "./components/header"
import { SideBar } from "./components/sidebar"
import { Post } from "./components/post"


export function App() {
  return (
    <>
    
    <Header />

    <div className={styles.wrapper}>
      <SideBar />
      <main>
        <Post />
      </main>
    </div>
    </>
  )
}

