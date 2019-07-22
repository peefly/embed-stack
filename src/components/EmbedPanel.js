import React from 'react'
import { Embed } from './Embed'
import { initialEmbedListDataState } from 'reducers/AppReducer'

export const EmbedPanel = ({embedListData, removeHandler, topHandler, setHtmlHandler, replaceHandler}) => {
  
  let allEmbedData = embedListData.embedList.map((ele, idx)=>{
    let result = <Embed key={idx} embed={ele} 
                    removeHandler={removeHandler} mouseDownHandler={topHandler} 
                    setHtmlHandler={setHtmlHandler} replaceHandler={replaceHandler}/>;
    return result
  });
  return (
    <div>
      <div>{allEmbedData}</div>
    </div>
  );
}

EmbedPanel.defaultProps = {
  embedListData: initialEmbedListDataState
}
