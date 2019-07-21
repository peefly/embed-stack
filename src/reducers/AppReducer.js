import { ADD_EMBED, REMOVE_EMBED } from 'actions/app'
import { combineReducers } from 'redux'

const initialEmbedListState = []

const embedList = (state=initialEmbedListState, action) => {
  let newState
  switch (action.type) {
    case ADD_EMBED:
      newState = [...state, action.newEmbed]
      return newState
    case REMOVE_EMBED:
      const isRemovedFilter = (v) => {return (v.uid === action.uid)} 
      newState = [...state]
      let idx = newState.findIndex(isRemovedFilter)
      if (idx === -1) {
        return state
      }

      newState[idx].removed = true;

      return newState
    default:
      return state
  }
}


export const AppReducer = combineReducers({
  embedList
})
