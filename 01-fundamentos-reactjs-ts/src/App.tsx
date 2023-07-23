import './css/global.css'
import styles from './css/App.module.css'

import { Header } from "./components/header"
import { SideBar } from "./components/sidebar"
import { Post } from "./components/post"
import { posts } from './data'

export function App() {
  return (
    <>
    
    <Header />

    <div className={styles.wrapper}>
      <SideBar />
      <main>
        {posts.map((post) => {
          return (
            <Post
            post={post}
            key={post.id}
            /> 
          )
        })}
      </main>
    </div>
    </>
  )
}

