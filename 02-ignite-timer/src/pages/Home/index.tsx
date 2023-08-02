import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles"
import { createContext, useState } from "react"
import { NewCycleForm } from "./components/NewCycleForm"
import { Countdown } from "./components/Countdown"
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

type Cycle = {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

type CyclesContextAPI = {
    activeCycle: Cycle | undefined
    activeCycleID: string | null
    amountSecondsPast: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
}

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa!'),
    minutesAmount: zod.number().min(1).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const CyclesContext = createContext({} as CyclesContextAPI)

export const Home = () => {

    const form = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
    const [amountSecondsPast, setAmountSecondsPast] = useState<number>(0)
   
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleID)

    const handleCreateNewCycle = (data: NewCycleFormData) => {

        const id = new Date().getTime().toString()

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        
        setCycles((state) => [...state, newCycle])
        setActiveCycleID(id)
        setAmountSecondsPast(0)

        form.reset()
    }

    const handleInterruptedCycle = () => {
        setCycles(
            state => state.map(cycle => {
            if (cycle.id === activeCycleID) {
                return { ...cycle, interruptedDate: new Date( )}
            } else {
                return cycle
            }
        }))
        setActiveCycleID(null)
    }

    const markCurrentCycleAsFinished = () => {
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleID) {
                return { ...cycle, finishedDate: new Date( )}
            } else {
                return cycle
            }
        }))
    }

    const setSecondsPassed = (seconds: number) => {
        setAmountSecondsPast(seconds)
    }

    const taskValue = form.watch('task')
    const isSubmitDisabled = !taskValue

    return (
        <HomeContainer>
            <form onSubmit={form.handleSubmit(handleCreateNewCycle)}>

                <CyclesContext.Provider value={{ activeCycle, activeCycleID, markCurrentCycleAsFinished, amountSecondsPast, setSecondsPassed  }}>
                    <FormProvider {...form}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>
        
                {activeCycle ? (
                     <StopCountdownButton onClick={handleInterruptedCycle} type="button"> 
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