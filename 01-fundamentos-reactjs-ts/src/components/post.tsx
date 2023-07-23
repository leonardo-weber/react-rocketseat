import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import styles from '../css/Post.module.css'
import { Avatar } from './Avatar'
import { Comment } from './comment'
import { format, formatDistanceToNow} from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

type Author = {
    name: string
    role: string
    avatarUrl: string
}

type Content = {
    type: 'paragraph' | 'link'
    content: string
}

export type Post = {
    id: number
    author: Author
    publishedAt: Date
    content: Content[]  
}

type PostProps = {
    post: Post
}


export const Post = (props: PostProps) => {

    const { post } = props
    const { author, publishedAt, content } = post

    const newCommentInitialState = ''

    const [comments, setComments] = useState(['ola'])
    const [newComment, setNewComment] = useState(newCommentInitialState)

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {
        locale: ptBr
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBr,
        addSuffix: true,
    })

    const handleNewComment = (event: FormEvent) => {
        event.preventDefault()
        setComments([...comments, newComment])
        setNewComment(newCommentInitialState)
    }

    const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity('')
        setNewComment(event.target.value)
    }


    const handleInvalidComment = (event: InvalidEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity('Este campo é obrigatorio')
    }

    const deleteComment = (comment: string) => {
        const updatedList = comments.filter(listComment => listComment !== comment)
        setComments(updatedList)
    }

    const commentNotValid = newComment.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl}  />
                    <div className={styles.authorInfo}>
                        <strong> {author.name} </strong>
                        <strong> {author.role} </strong>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}> {publishedDateRelativeToNow} </time>
            </header>

            <div className={styles.content}>
                {content.map((line) => {
                    return (
                        <p key={line.content}>
                            {line.type === 'link' ? <a href="#"> {line.content} </a> : line.content}
                        </p>
                    )
                })}
            </div>

        <form onSubmit={handleNewComment} className={styles.commentForm}>
            <strong> Deixe seu feedback </strong>

            <textarea
               value={newComment} 
               onChange={handleNewCommentChange} 
               name="comment"
               placeholder="Deixe um comentário" 
               onInvalid={handleInvalidComment}
               required
            />

            <footer>
                <button type='submit' disabled={commentNotValid}> Publicar </button>
            </footer>
        </form>

        <div className={styles.commentList}>
            {comments.map((comment) => {
                return (
                    <Comment comment={comment} key={comment} onDeleteComment={deleteComment} />
                )
            })}
        </div>

        </article>
    )
}