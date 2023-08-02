import { FormContainer, MinutesAmountInput, TaskInput } from "./styles"
import { useContext } from "react"
import { CyclesContext } from "../.."
import { useFormContext } from "react-hook-form"

export const NewCycleForm = () => {

    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
    <FormContainer>

        <label htmlFor="task"> Vou trabalhar em </label>
        <TaskInput 
            id="task" 
            type="text" 
            placeholder="De um nome para o seu projeto" 
            disabled={!!activeCycle}
            list="taskSuggestions"
            {...register('task')}
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
            {...register('minutesAmount', { valueAsNumber: true })}
        />

        <span> minutos. </span>

    </FormContainer>
    )
}