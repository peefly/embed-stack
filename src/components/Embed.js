import React from 'react'

export const Embed = (props) => {
  const {embed} = props;

  const createMarkup = (embedData) => {
    return {__html: embedData};
  };
  
  return (
    <div dangerouslySetInnerHTML={createMarkup(embed)} />
  );
}