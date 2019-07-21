import React from 'react'
import { Embed } from './Embed'

export const EmbedPanel = ({embedListData, removeHandler, topHandler}) => {
  
  let allEmbedData = embedListData.embedList.map((ele, idx)=>{
    let result = <Embed key={idx} embed={ele} 
                    removeHandler={removeHandler} mouseDownHandler={topHandler} />;
    return result
  });
  return (
    <div>
      <div>{allEmbedData}</div>
    </div>
  );
}

EmbedPanel.defaultProps = {
  embedListData: {
    embedList: []
  }
}