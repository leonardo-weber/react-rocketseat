import { ImgHTMLAttributes } from 'react'
import styles from '../css/Avatar.module.css'

type AvatarProps = {
    noBorder?: boolean
} & ImgHTMLAttributes<HTMLImageElement> 

export const Avatar = (props: AvatarProps) => {
    const { noBorder = false, ...imageProps} = props 
    return (
        <img 
        className={noBorder ? styles.avatar : styles.avatarWithBorder } 
        {...imageProps}        
        />
    )
}