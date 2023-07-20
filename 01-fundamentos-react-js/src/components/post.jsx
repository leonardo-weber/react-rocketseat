import styles from '../css/Post.module.css'

export const Post = () => {
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <img className={styles.avatar} src="https://github.com/leonardo-weber.png" />
                    <div className={styles.authorInfo}>
                        <strong> Leonardo Weber </strong>
                        <strong> Developer </strong>
                    </div>
                </div>

                <time title="11 de maio de 2022" dateTime="2022-05-11 08:13:30"> Publicado há 1hr </time>
            </header>

            <div className={styles.content}>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                <p> <a href=""> jane.design/doctorcare </a> </p>
                <p> 
                    <a href=""> #novoprojeto </a> 
                    <a href=""> #nlw </a> 
                    <a href=""> #rocketseat </a> 
                </p>
            </div>

        <form className={styles.commentForm}>
            <strong> Deixe seu feedback </strong>
            <textarea placeholder="Deixe um comentário"></textarea>
            <footer>
                <button type='submit'> Publicar </button>
            </footer>
        </form>

        </article>
    )
}