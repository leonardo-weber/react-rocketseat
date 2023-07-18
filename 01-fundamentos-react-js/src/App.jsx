import { Post } from "./Post"
import { Header } from "./components/header"

import './css/global.css'
import AppStyles from './css/App.module.css'

export function App() {
  return (
    <>
    
    <Header />

    <div className={AppStyles.wrapper}>
      <aside></aside>
      <main>
        <Post />
      </main>
    </div>
    </>
  )
}

