import { MagnifyingGlass } from "phosphor-react"
import { SearchFormContainer } from "./styles"
import { useForm } from "react-hook-form"
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react"
import { TransactionsContext } from "../../contexts/Transaction"


const searchFormSchema = zod.object({
    query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export const SearchForm = () => {

    const { 
        register, 
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    })

    const { fetchTransactions } = useContext(TransactionsContext)

    const handleSearchTransactions = async (data: SearchFormInputs) => {
        await fetchTransactions(data.query)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions    )}>
            <input 
            type="text" 
            placeholder="Busque por transações" 
            {...register('query')}
            />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}