import React, { useState, useEffect } from 'react'
import { FaArrowAltCircleDown, FaSyncAlt, FaTimes } from 'react-icons/fa'
import { Rnd } from "react-rnd";
import { Button, OverlayTrigger, Tooltip, ButtonGroup } from 'react-bootstrap'
import './Embed.scss';

export const Embed = (props) => {
  const {removeHandler, mouseDownHandler, setHtmlHandler, replaceHandler, setLayoutHandler} = props;
  const {platform, platformId, embedHtml, uid, layout} = props.embed;
  const createMarkup = (embedData) => {return {__html: embedData}}

  const controlPanelHeight = 32;
  
  let backgroundStyle = {
    alignItems: "center",
    justifyContent: "center",
    border: "solid 0px #aaa",
    backgroundColor: "#222",
    zIndex: layout.zIndex,
  };
  
  let embedStyle = {
    top: controlPanelHeight, 
    backgroundColor: "#222", 
    position: "absolute",
    ...layout.size
  }

  const setLayout = ({x, y, width, height}) => {
    //let newLayout = {...layout};
    layout.size = {width, height};
    layout.position = {x, y};
    setLayoutHandler(uid, layout);
  }

  useEffect(() => {
    //console.log(`layout: ${JSON.stringify(layout)}`);
  })
  
  
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  

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
    let newW = parseInt(ref.style.width, 10);
    let newH = parseInt(ref.style.height, 10) - controlPanelHeight;
    setLayout({width: newW, height: newH, ...pos})
  }
  const refresh = () => {
    setHtmlHandler(uid, "");
    setTimeout(setHtmlHandler, 0, uid, embedHtml)
  }
  const replace = () => {
    setHtmlHandler(uid, "");
    setTimeout(replaceHandler, 0, uid)
  }

  if (backgroundVisible) {
    backgroundStyle.backgroundColor = "#222";
  } else {
    backgroundStyle.backgroundColor = "rgba(0,0,0,0)";
  }
  
  return (
    <Rnd
      style={backgroundStyle}
      lockAspectRatio={embedStyle.width/embedStyle.height}
      lockAspectRatioExtraHeight={controlPanelHeight}
      onMouseOver={()=>setBackgroundVisible(true)}
      onMouseOut={()=>setBackgroundVisible(false)}
      position={layout.position}
      size={{
        width: layout.size.width, 
        height: layout.size.height + controlPanelHeight
      }}
      onDragStop={(e, d) => { setLayout({...layout.size, ...d}) }}
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
            <Button variant="dark" size="sm" onClick={replace}><FaArrowAltCircleDown /></Button>
          </OverlayTrigger>
          <OverlayTrigger key="refresh" placement="top" overlay={<Tooltip>重整</Tooltip>}>
            <Button variant="dark" size="sm" onClick={refresh}><FaSyncAlt /></Button>
          </OverlayTrigger>
          <OverlayTrigger key="close" placement="top" overlay={<Tooltip>關閉</Tooltip>}>
            <Button variant="dark" size="sm" onClick={()=>removeHandler(uid)}><FaTimes /></Button>
          </OverlayTrigger>
        </ButtonGroup>
      </div> 
      { true &&
        <div style={embedStyle} dangerouslySetInnerHTML={createMarkup(embedHtml)} />
      }
      { false && // placeholder for debug
        <div style={embedStyle} />
      }
      
    </Rnd>
    

    
  );
}