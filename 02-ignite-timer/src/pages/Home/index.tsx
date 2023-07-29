import { Play } from "phosphor-react"
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, StartCountdownButton, TaskInput } from "./styles"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa!'),
    minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home = () => {

    const form = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const handleCreateNewCycle = (data) => {
        form.reset()
    }

    const taskValue = form.watch('task')
    const isSubmitDisabled = !taskValue

    return (
        <HomeContainer>
            <form onSubmit={form.handleSubmit(handleCreateNewCycle)}>
                <FormContainer>

                    <label htmlFor="task"> Vou trabalhar em </label>
                    <TaskInput 
                        id="task" 
                        type="text" 
                        placeholder="De um nome para o seu projeto" 
                        list="taskSuggestions"
                        {...form.register('task')}
                    />

                    <datalist id="taskSuggestions">
                        <option value=""></option>
                    </datalist>

                    <label htmlFor="minutesAmount"> Durante </label>
                    <MinutesAmountInput 
                        id="minutesAmount" 
                        type="number" 
                        placeholder="00" 
                        step={5}
                        min={5}
                        max={60}
                        {...form.register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span> minutos. </span>

                </FormContainer>

                <CountdownContainer>
                    <span> 0 </span>
                    <span> 0</span>
                    <span> : </span>
                    <span> 0</span>
                    <span> 0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit"> 
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>

        </HomeContainer>
    )
}