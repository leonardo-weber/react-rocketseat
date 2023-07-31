import { HandPalm, Play } from "phosphor-react"
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, StartCountdownButton, StopCountdownButton, TaskInput } from "./styles"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react"
import { differenceInSeconds} from 'date-fns'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa!'),
    minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

type Cycle = {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
}

export const Home = () => {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
    const [amountSecondsPast, setAmountSecondsPast] = useState<number>(0)

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleID)

    useEffect(() => {

        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                setAmountSecondsPast(differenceInSeconds(new Date(), activeCycle.startDate))
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }

    }, [activeCycle])

    const form = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

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
        setCycles(cycles.map(cycle => {
            if (cycle.id === activeCycleID) {
                return { ...cycle, interruptedDate: new Date( )}
            } else {
                return cycle
            }
        }))
        setActiveCycleID(null)
    }

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPast : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = minutesAmount & 60

    const minutes = minutesAmount.toString().padStart(2, '0')
    const seconds = secondsAmount.toString().padStart(2, '0')

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

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
                        disabled={!!activeCycle}
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
                        disabled={!!activeCycle}
                        {...form.register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span> minutos. </span>

                </FormContainer>

                <CountdownContainer>
                    <span> {minutes[0]} </span>
                    <span> {minutes[1]} </span>
                    <span> : </span>
                    <span> {seconds[0]} </span>
                    <span> {seconds[1]} </span>
                </CountdownContainer>

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