import { ADD_EMBED } from 'actions/app'
import { combineReducers } from 'redux'

const initialState = []

const embedList = (state=initialState, action) => {
  switch (action.type) {
    case ADD_EMBED:
      const newState = [...state, action.newEmbed]
      return newState
    default:
      return state
  }
}


export const AppReducer = combineReducers({
  embedList
})
