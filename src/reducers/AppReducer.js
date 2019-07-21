import { ADD_EMBED, REMOVE_EMBED } from 'actions/app'
import { combineReducers } from 'redux'

const initialState = []

const embedList = (state=initialState, action) => {
  let newState
  switch (action.type) {
    case ADD_EMBED:
      newState = [...state, action.newEmbed]
      return newState
    case REMOVE_EMBED:
      const notRemovedFilter = (v) => {return (v.uid !== action.uid)} 
      newState = state.filter(notRemovedFilter)
      
      console.log(`reducer state: ${JSON.stringify(state)}`);
      console.log(`reducer newState: ${JSON.stringify(newState)}`);
      console.log(`removeUid: ${action.uid}`);
      console.log(state.map((v)=>v.uid));
      console.log(newState.map((v)=>v.uid));

      return newState
    default:
      return state
  }
}


export const AppReducer = combineReducers({
  embedList
})
