import React from 'react'
import { Embed } from './Embed'
import { initialEmbedListDataState } from 'reducers/AppReducer'

export const EmbedPanel = ({embedListData, removeHandler, topHandler, setHtmlHandler, replaceHandler}) => {
  let allEmbedData = Object.keys(embedListData.embedList).map(key => {
    let result = <Embed key={key} embed={embedListData.embedList[key]} 
                    removeHandler={removeHandler} mouseDownHandler={topHandler} 
                    setHtmlHandler={setHtmlHandler} replaceHandler={replaceHandler}/>;
    return result
  });
  return (
    <div>{allEmbedData}</div>
  );
}

EmbedPanel.defaultProps = {
  embedListData: initialEmbedListDataState
}
