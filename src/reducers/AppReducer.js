import { ADD_EMBED, REMOVE_EMBED, TOP_EMBED, SET_EMBED_HTML } from 'actions/app'
import { combineReducers } from 'redux'
import update from 'immutability-helper';
import Counter from 'utility/counter'

export const initialEmbedListDataState = {
  embedList: []
}

const embedListData = (state=initialEmbedListDataState, action) => {
  let newState;
  let change;
  let idx;
  const getIdxByUid = (ary, uid) => {
    const ftr = (v) => {return v.uid === uid}
    return ary.findIndex(ftr)
  }
  //console.log(`embedListData action: ${JSON.stringify(action)}`);
  switch (action.type) {
    case ADD_EMBED:
      change = {
        embedList: {$push: [action.newEmbed]}
      }
      newState = update(state, change);
      return newState
    case REMOVE_EMBED:
      newState = {...state}
      idx = getIdxByUid(newState.embedList, action.uid);
      if (idx === -1) {
        return state
      }
      newState.embedList[idx].removed = true;
      newState.embedList[idx].embedHtml = "";
      return newState
    case TOP_EMBED:
      newState = {...state}
      idx = getIdxByUid(newState.embedList, action.uid);
      if (idx === -1) {
        return state
      }
      newState.embedList[idx].zIndex = Counter.next();
      return newState
    case SET_EMBED_HTML:
      newState = {...state}
      idx = getIdxByUid(newState.embedList, action.uid);
      if (idx === -1) {
        return state
      }
      newState.embedList[idx].embedHtml = action.embedHtml;
      return newState

    default:
      return state
  }
}


export const AppReducer = combineReducers({
  embedListData
})
