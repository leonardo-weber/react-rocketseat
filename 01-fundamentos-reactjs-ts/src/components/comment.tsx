import { ThumbsUp, Trash } from 'phosphor-react'
import styles from '../css/Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

type CommentProps = {
    comment: string
    onDeleteComment: (comment: string) => void
}

export const Comment = (props: CommentProps) => {

    const { comment, onDeleteComment } = props
    const [likeCount, setLikeCount] = useState(0)

    const handleDeleteComment = () => {
        onDeleteComment(comment)
    }

    const handleLikeComment = () => {
        setLikeCount((state) => state + 1)
    }

    return (
        <div className={styles.comment}>
   
            <Avatar noBorder src={'https://github.com/leonardo-weber.png'}  />

            <div className={styles.commentBox}>
                <div className={styles.commentComment}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong> Diego Fernandes </strong>
                            <time title="11 de Maio às 08:13h" dateTime='2022-05-11 08:13:30'> Cerca de 1h atrás </time>
                        </div>

                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={24} />
                        </button>
                    </header>

                    <p> {comment} </p>
                </div>
            <footer>
                <button onClick={handleLikeComment}>
                    <ThumbsUp />
                    Aplaudir <span> {likeCount} </span>
                </button>
            </footer>
            </div>
         </div>
    )
}