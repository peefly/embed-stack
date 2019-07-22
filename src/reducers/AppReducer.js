import { ADD_EMBED, REMOVE_EMBED, TOP_EMBED, SET_EMBED_HTML, SET_EMBED_INPUT_RAW, REPLACE_EMBED } from 'actions/app'
import { combineReducers } from 'redux'
import Counter from 'utility/counter'
import { getEmbedData } from 'components/InputOperator'

const defaultEmbedInputRaw = '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FLeggyReki%2Fvideos%2F1089448934776057%2F&show_text=0&width=560" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>';
export const initialEmbedListDataState = {
  embedList: {},
  embedInputRaw: defaultEmbedInputRaw
}

const embedListData = (state=initialEmbedListDataState, action) => {
  let newState;
  console.log(`embedListData action: ${JSON.stringify(action)}`);
  console.log(`embedListData state: ${JSON.stringify(state)}`);
  switch (action.type) {
    case ADD_EMBED:
      newState = {...state}
      newState.embedList[action.newEmbed.uid] = action.newEmbed;
      return newState
    case REMOVE_EMBED:
      newState = {...state}
      delete newState.embedList[action.uid];
      return newState
    case TOP_EMBED:
      newState = {...state}
      newState.embedList[action.uid].zIndex = Counter.next();
      return newState
    case SET_EMBED_HTML:
      newState = {...state}
      newState.embedList[action.uid].embedHtml = action.embedHtml;
      return newState
    case SET_EMBED_INPUT_RAW:
      newState = {...state}
      newState.embedInputRaw = action.embedInputRaw;
      return newState
    case REPLACE_EMBED:
      newState = {...state}
      const processedData = getEmbedData(state.embedInputRaw);
      delete newState.embedList[action.uid]
      newState.embedList[processedData.uid] = processedData;
      return newState

    default:
      return state
  }
}

export const AppReducer = combineReducers({
  embedListData
})
