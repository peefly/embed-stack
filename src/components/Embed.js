import React, {useState} from 'react'
import { FaTimes } from 'react-icons/fa'
import { Rnd } from "react-rnd";
import { Button } from 'react-bootstrap'
import './Embed.scss';

export const Embed = (props) => {
  const {embed} = props;

  const createMarkup = (embedData) => {
    return {__html: embedData};
  };

  const backgroundStyle = {
    //display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 0px #aaa",
    background: "#222",
    
  };

  let controlPanelStyle = {
    height: "32px",
    width: "100%",
    top: "-32px",
    left: "-1px",
    position: "absolute",
    backgroundColor: "#222",
    color: "#fff",
    border: "solid 0px #aaa",
    margin: "1px",
    alignItems: "right",
    textAlign: "right",
  }
  const [controlPanelVisible, setControlPanelVisible] = useState(false);

  const showControlPanel = (e)=> {
    setControlPanelVisible(true);
    console.log("showControlPanel");
  }
  const hideControlPanel = (e)=> {
    setControlPanelVisible(false);
    console.log("hideControlPanel");
  }

  return (
      <Rnd
        style={backgroundStyle}
        default={{
          x: 100, y: 100,
          width: 960, height: 540
        }}
        lockAspectRatio
        onMouseOver={showControlPanel}
        onMouseOut={hideControlPanel}
      >
        { controlPanelVisible &&
          <div style={controlPanelStyle}>
            <Button variant="dark" size="sm"><FaTimes /></Button>
          </div> 
        }
        
        <div className="EmbedBackground full" dangerouslySetInnerHTML={createMarkup(embed)} />
      </Rnd>
    

    
  );
}