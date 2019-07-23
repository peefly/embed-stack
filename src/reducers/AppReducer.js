import { ADD_EMBED, REMOVE_EMBED, TOP_EMBED, SET_EMBED_HTML, SET_EMBED_INPUT_RAW, REPLACE_EMBED, SET_EMBED_LAYOUT } from 'actions/app'
import { combineReducers } from 'redux'
import Counter from 'utility/Counter'
import { getEmbedData } from 'components/InputOperator'

const defaultEmbedInputRaw = '';
// debug default
//const defaultEmbedInputRaw = '<iframe src="https://player.twitch.tv/?channel=qttsix" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe><a href="https://www.twitch.tv/qttsix?tt_content=text_link&tt_medium=live_embed" style="padding:2px 0px 4px; display:block; width:345px; font-weight:normal; font-size:10px; text-decoration:underline;">在 www.twitch.tv 觀賞 六希夫 的實況影片</a>';
export const initialEmbedListDataState = {
  embedList: {},
  embedInputRaw: defaultEmbedInputRaw
}

const embedListData = (state=initialEmbedListDataState, action) => {
  let newState;
  //console.log(`embedListData action: ${JSON.stringify(action)}`);
  //console.log(`embedListData state: ${JSON.stringify(state)}`);
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
      newState.embedList[action.uid].layout.zIndex = Counter.next();
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
      processedData.layout = newState.embedList[action.uid].layout;
      delete newState.embedList[action.uid]
      newState.embedList[processedData.uid] = processedData;
      return newState
    case SET_EMBED_LAYOUT:
      newState = {...state}
      newState.embedList[action.uid]['layout'] = action.layout;
      return newState

    default:
      return state
  }
}

export const AppReducer = combineReducers({
  embedListData
})
