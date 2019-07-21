import { ADD_EMBED, REMOVE_EMBED, TOP_EMBED } from 'actions/app'
import { combineReducers } from 'redux'
import update from 'immutability-helper';
import Counter from 'utility/counter'

export const initialEmbedListDataState = {
  embedList: []
}

const embedListData = (state=initialEmbedListDataState, action) => {
  let newState;
  let change;
  let isUIDFilter;
  let idx;
  switch (action.type) {
    case ADD_EMBED:
      change = {
        embedList: {$push: [action.newEmbed]}
      }
      newState = update(state, change);
      return newState
    case REMOVE_EMBED:
      isUIDFilter = (v) => {return (v.uid === action.uid)} 
      newState = {...state}
      idx = newState.embedList.findIndex(isUIDFilter)
      if (idx === -1) {
        return state
      }
      newState.embedList[idx].removed = true;
      newState.embedList[idx].embedHtml = "";
      return newState
    case TOP_EMBED:
        isUIDFilter = (v) => {return (v.uid === action.uid)} 
        newState = {...state}
        idx = newState.embedList.findIndex(isUIDFilter)
        if (idx === -1) {
          return state
        }
        newState.embedList[idx].zIndex = Counter.next();
        return newState

    default:
      return state
  }
}


export const AppReducer = combineReducers({
  embedListData
})
