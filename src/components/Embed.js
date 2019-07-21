import React, { useState, useCallback } from 'react'
import { FaArrowAltCircleDown, FaSyncAlt, FaTimes } from 'react-icons/fa'
import { Rnd } from "react-rnd";
import { Button, OverlayTrigger, Tooltip, ButtonGroup } from 'react-bootstrap'
import './Embed.scss';
import update from 'immutability-helper';

export const Embed = (props) => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => {
    console.log("forceUpdate");
    return updateState({}), []
  });

  const {removeHandler, mouseDownHandler} = props;
  const {platform, platformId, embedHtml, uid, removed, zIndex} = props.embed;
  const createMarkup = (embedData) => {return {__html: embedData}}
  
  let backgroundStyle = {
    alignItems: "center",
    justifyContent: "center",
    border: "solid 0px #aaa",
    backgroundColor: "#222",
    visibility: removed?"none":"visible",
    zIndex: zIndex
  };
  const controlPanelHeight = 32;

  
  const embedStyleInitial = {
    top: controlPanelHeight, 
    backgroundColor: "#222", 
    width: 1920 * 0.5, 
    height: 1080 * 0.5, 
    position: "absolute",
  }
  
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [position, setPosition] = useState({x:100 ,y: 100})
  const [embedStyle, setEmbedStyle] = useState(embedStyleInitial);
  if (removed) return ("");

  let controlPanelStyle = {
    height: controlPanelHeight,
    right: "0px",
    position: "absolute",
    backgroundColor: "#222",
    color: "#fff",
    border: "solid 0px #aaa",
    alignItems: "right",
    textAlign: "right",
    visibility: backgroundVisible?"visible":"hidden",
  }
  let titlePanelStyle = {
    height: controlPanelHeight,
    left: "0px",
    position: "absolute",
    backgroundColor: "#222",
    color: "#fff",
    border: "solid 0px #aaa",
    alignItems: "left",
    textAlign: "left",
    visibility: backgroundVisible?"visible":"hidden",
    paddingLeft: 10,
    lineHeight: `${controlPanelHeight}px`
  }

  const resizeHandler = (e, direction, ref, delta, pos) => {
    setPosition(pos);

    let newW = parseInt(ref.style.width, 10);
    let newH = parseInt(ref.style.height, 10) - controlPanelHeight;
    const change = {
      width: {$set: newW}, 
      height: {$set: newH}
    };
    setEmbedStyle(update( embedStyle,  change));
  }

  if (backgroundVisible) {
    backgroundStyle.backgroundColor = "#222";
  } else {
    backgroundStyle.backgroundColor = "rgba(0,0,0,0)";
  }
  
  return (
    <Rnd
      style={backgroundStyle}
      lockAspectRatio={embedStyleInitial.width/embedStyleInitial.height}
      lockAspectRatioExtraHeight={controlPanelHeight}
      onMouseOver={()=>setBackgroundVisible(true)}
      onMouseOut={()=>setBackgroundVisible(false)}
      size={{
        width: embedStyle.width,
        height: embedStyle.height + controlPanelHeight
      }}
      position={position}
      onDragStop={(e, d) => { setPosition({x:d.x, y:d.y}) }}
      onResize={resizeHandler}
      onMouseDown={()=>mouseDownHandler(uid)}
      bounds="window"
      cancel=".controlPanel"
    >
      <div className="titlePanel" style={titlePanelStyle}>
        {platformId} - {platform} ({uid})
      </div>
      <div className="controlPanel" style={controlPanelStyle}>
        <ButtonGroup>
          <OverlayTrigger key="replace" placement="top" overlay={<Tooltip>取代</Tooltip>}>
            <Button variant="dark" size="sm"><FaArrowAltCircleDown /></Button>
          </OverlayTrigger>
          <OverlayTrigger key="refresh" placement="top" overlay={<Tooltip>重整</Tooltip>}>
            <Button variant="dark" size="sm" onClick={forceUpdate}><FaSyncAlt /></Button>
          </OverlayTrigger>
          <OverlayTrigger key="close" placement="top" overlay={<Tooltip>關閉</Tooltip>}>
            <Button variant="dark" size="sm" onClick={()=>removeHandler(uid)}><FaTimes /></Button>
          </OverlayTrigger>
        </ButtonGroup>
      </div> 
      <div style={embedStyle} dangerouslySetInnerHTML={createMarkup(embedHtml)} />
      
    </Rnd>
    

    
  );
}