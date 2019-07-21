import React from 'react'
import { Embed } from './Embed'

export const EmbedPanel = ({embedList}) => {
  let allEmbedData = embedList.map((ele, idx)=>{return <Embed key={idx} embed={ele} />});
  return (
    <div>
      <div>{allEmbedData}</div>
    </div>
  );
}

EmbedPanel.defaultProps = {
  embedList: []
}
