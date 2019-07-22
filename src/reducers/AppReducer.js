import { ADD_EMBED, REMOVE_EMBED, TOP_EMBED, SET_EMBED_HTML, SET_EMBED_INPUT_RAW, IMPORT_EMBED } from 'actions/app'
import { combineReducers } from 'redux'
import update from 'immutability-helper';
import Counter from 'utility/counter'
import { getEmbedData } from 'components/InputOperator'

const defaultEmbedInputRaw = '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FLeggyReki%2Fvideos%2F1089448934776057%2F&show_text=0&width=560" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>';
export const initialEmbedListDataState = {
  embedList: [],
  embedInputRaw: defaultEmbedInputRaw
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
    case SET_EMBED_INPUT_RAW:
      newState = {...state}
      newState.embedInputRaw = action.embedInputRaw;
      return newState
    case IMPORT_EMBED:
      newState = {...state}
      idx = getIdxByUid(newState.embedList, action.uid);
      if (idx === -1) {
        return state
      }
      const processedData = getEmbedData(state.embedInputRaw);
      newState.embedList[idx] = processedData;
      return newState

    default:
      return state
  }
}

export const AppReducer = combineReducers({
  embedListData
})
