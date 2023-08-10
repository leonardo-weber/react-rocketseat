import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles"
import logoImg from '../../assets/logo.svg'

export const Header = () => {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt="" />
                <NewTransactionButton> Nova transaçao </NewTransactionButton>
            </HeaderContent>
        </HeaderContainer>
    )
}