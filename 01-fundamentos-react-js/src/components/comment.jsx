import { ThumbsUp, Trash } from 'phosphor-react'
import styles from '../css/Comment.module.css'
import { Avatar } from './Avatar'

export const Comment = (props) => {

    const { comment, onDeleteComment } = props

    const handleDeleteComment = () => {
        onDeleteComment(comment)
    }

    return (
        <div className={styles.comment}>
   
            <Avatar noBorder src={'https://github.com/leonardo-weber.png'}  />

            <div className={styles.commentBox}>
                <div className={styles.commentComment}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong> Diengo Fernandes </strong>
                            <time title="11 de Maio às 08:13h" dateTime='2022-05-11 08:13:30'> Cerca de 1h atrás </time>
                        </div>

                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={24} />
                        </button>
                    </header>

                    <p> {comment} </p>
                </div>
            <footer>
                <button>
                    <ThumbsUp />
                    Aplaudir <span>20</span>
                </button>
            </footer>
            </div>
         </div>
    )
}