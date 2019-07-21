import React from 'react'
import { Embed } from './Embed'

export const EmbedPanel = ({embedList, removeHandler}) => {
  
  let allEmbedData = embedList.map((ele, idx)=>{
    let result = <Embed key={idx} embed={ele} removeHandler={removeHandler} />;
    return result
  });
  return (
    <div>
      <div>{allEmbedData}</div>
    </div>
  );
}

EmbedPanel.defaultProps = {
  embedList: []
}
