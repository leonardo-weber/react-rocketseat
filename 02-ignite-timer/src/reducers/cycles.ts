import { produce } from 'immer'

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
  }

interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export enum Actiontypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

export const cyclesReducer = (state: CyclesState, action: any) => {

    switch (action.type) {
      case Actiontypes.ADD_NEW_CYCLE:
        return produce(state, draft => {
            draft.cycles.push(action.payload.newCycle)
            draft.activeCycleId = action.payload.newCycle.id
        })
        case Actiontypes.INTERRUPT_CURRENT_CYCLE: {
            const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)
            if (currentCycleIndex < 0) {
                return state
            }
            return produce(state, draft => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].interruptedDate = new Date()
            })
        }
        case Actiontypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
            const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)
            if (currentCycleIndex < 0) {
                return state
            }
            return produce(state, draft => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].finishedDate = new Date()
            })
        }
        default:
          return state
        }
  }