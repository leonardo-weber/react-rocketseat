import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles"
import { NewCycleForm } from "./components/NewCycleForm"
import { Countdown } from "./components/Countdown"
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { CyclesContext } from '../../contexts/CyclesContext'
import { useContext } from "react"

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa!'),
    minutesAmount: zod.number().min(1).max(60),
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
   
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const handleCreateNewCycle = (data: NewCycleFormData) => {
        form.reset()
        createNewCycle(data)
    }
    
    const taskValue = form.watch('task')
    const isSubmitDisabled = !taskValue

    return (
        <HomeContainer>
            <form onSubmit={form.handleSubmit(handleCreateNewCycle)}>

            <FormProvider {...form}>
                <NewCycleForm />
            </FormProvider>
            <Countdown />

                {activeCycle ? (
                     <StopCountdownButton onClick={interruptCurrentCycle} type="button"> 
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit"> 
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}

            </form>

        </HomeContainer>
    )
}