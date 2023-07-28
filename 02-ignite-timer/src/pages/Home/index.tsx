import { Play } from "phosphor-react"
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, StartCountdownButton, TaskInput } from "./styles"

export const Home = () => {
    return (
        <HomeContainer>
            <form>
                <FormContainer>

                    <label htmlFor="task"> Vou trabalhar em </label>
                    <TaskInput 
                        id="task" 
                        type="text" 
                        placeholder="De um nome para o seu projeto" 
                        list="taskSuggestions"
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

                <StartCountdownButton type="submit"> 
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>

        </HomeContainer>
    )
}