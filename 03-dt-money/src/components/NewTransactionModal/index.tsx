import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from "react-hook-form"
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { TransactionsContext } from '../../contexts/Transaction'
import { useContextSelector } from 'use-context-selector'

const newTransactionModalSchema = zod.object({
    description: zod.string(),
    price: zod.number(),
    category: zod.string(),
    type: zod.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionModalSchema>

export const NewTransactionModal = () => {

    const { 
        control,
        register, 
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionModalSchema),
    })

    const  createTransaction  = useContextSelector(TransactionsContext, (context) => context.createTransaction)

    const handleCreateNewTransaction = async (data: NewTransactionFormInputs) => {
        const { description, price, category, type } = data
        await createTransaction({
            category,
            description,
            price,
            type,
        })
        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title> Nova transação </Dialog.Title>

                <CloseButton> 
                    <X />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                    type="text" 
                    placeholder='Descrição' 
                    required 
                    {...register('description')}
                    />
                    <input 
                    type="text" 
                    placeholder='Preço' 
                    required 
                    {...register('price', { valueAsNumber: true })}
                    />
                    <input 
                    type="text" 
                    placeholder='Categoria' 
                    required 
                    {...register('category')}
                    />

                    <Controller
                    control={control}
                    name='type'
                    render={({ field }) => {
                        return (
                        <TransactionType value={field.value} onValueChange={field.onChange}>
                            <TransactionTypeButton value='income' variant='income'>
                                <ArrowCircleUp size={24} />
                                Entrada
                            </TransactionTypeButton>
                            <TransactionTypeButton value='outcome' variant='outcome'>
                                <ArrowCircleDown size={24} />
                                Saída
                            </TransactionTypeButton>
                        </TransactionType>
                        )
                    }}
                    
                    />

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                
                </form>

            </Content>
        </Dialog.Portal>
    )
}