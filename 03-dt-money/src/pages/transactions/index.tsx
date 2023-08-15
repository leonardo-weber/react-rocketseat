import { Header } from "../../components/Header"
import { SearchForm } from "../../components/SearchForm"
import { Summary } from "../../components/Summary"
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles"

export const Transactions = () => {
    return (
        <>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>
                        <tr>
                            <td width={'50%'}> Desenvolvimento de site </td>
                            <PriceHighlight variant={'income'}>
                                R$ 12.000,00
                            </PriceHighlight>
                            <td> Venda </td>
                            <td> 13/04/2022 </td>
                        </tr>
                        <tr>
                            <td width={'50%'}> Hamburguer </td>
                            <PriceHighlight variant={'outcome'}>
                                - R$ 58,00
                            </PriceHighlight>
                            <td> Alimentação </td>
                            <td> 13/04/2022 </td>
                        </tr>

                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </>
    )
}