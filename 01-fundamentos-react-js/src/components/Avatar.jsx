import styles from '../css/Avatar.module.css'

export const Avatar = (props) => {

    const { src, noBorder = false} = props 

    return (
        <img src={src} alt="" className={noBorder ? styles.avatar : styles.avatarWithBorder } />
    )
}