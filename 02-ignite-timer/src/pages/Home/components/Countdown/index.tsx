import { useContext, useEffect } from "react"
import { Separator, CountdownContainer } from "./styles"
import { differenceInSeconds } from "date-fns"
import { CyclesContext } from "../.."


export const Countdown = () => {

    const { activeCycle, activeCycleID, markCurrentCycleAsFinished, amountSecondsPast, setSecondsPassed } = useContext(CyclesContext)

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

    useEffect(() => {

        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const timeDiffInSeconds = differenceInSeconds(new Date(), activeCycle.startDate)
                if (timeDiffInSeconds >= totalSeconds) {
                    markCurrentCycleAsFinished()
                    setSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondsPassed(timeDiffInSeconds)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }

    }, [activeCycle, totalSeconds, activeCycleID, markCurrentCycleAsFinished, setSecondsPassed])

    return (
    <CountdownContainer>
        <span> {minutes[0]} </span>
        <span> {minutes[1]} </span>
        <Separator> : </Separator>
        <span> {seconds[0]} </span>
        <span> {seconds[1]} </span>
    </CountdownContainer>
    )
}