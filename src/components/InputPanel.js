import React, {useState} from 'react'
import { Button, InputGroup, Form, OverlayTrigger, Modal, Tooltip } from 'react-bootstrap';
import { getEmbedData } from './InputOperator'
import { initialEmbedListDataState } from 'reducers/AppReducer'
import './InputPanel.scss'

export const InputPanel = (props) => {
  const { embedListData, addHandler, setEmbedInputRawHandler } = props
  const onInputChange = (evt) => setEmbedInputRawHandler(evt.target.value);
  const onAddClick = () => {
    if (embedListData.embedInputRaw === "") return;
    let processedData = getEmbedData(embedListData.embedInputRaw);
    addHandler(processedData);
    //clearInput();
  }
  const clearInput = () => setEmbedInputRawHandler("");
  const inputStyle = {
    backgroundColor: "#333",
    color: "#aaa",
    border: "0px solid #fff",
    width: 60,
    flex: "none",
    padding: "4px",
  }

  const [showEmbedHelp, setShowEmbedHelp] = useState(false);

  const EmbedHelpModal = (props) => {
    return (
      <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            嵌入碼取得方式
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong style={{color: "#B200FF"}}>Twitch</strong><br />
            <span>[實況右下角分享] → [嵌入] → [使用 iframe]</span>
          </p>
          <p>
            <strong>
              <a href="https://www.facebook.com/help/1570724596499071" target="_blank" 
                rel="noopener noreferrer" style={{color: "#0023FF", textDecoration: "underline"}}>
                Facebook
              </a>
            </strong><br />
            <span>[實況右上角小鈴鐺旁三點] → [嵌入]</span>
          </p>
          <p>
            <strong>
              <a href="https://support.google.com/youtube/answer/171780" target="_blank" 
                rel="noopener noreferrer" style={{color: "#FF0000", textDecoration: "underline"}}>
                Youtube
              </a>
            </strong><br />
            <span>[實況/影片右下方分享] → [嵌入]</span>
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  const embedHelp = (props) => {
    const {outOfBoundaries, scheduleUpdate, show, arrowProps, ...rest} = props;
    return (<Tooltip {...rest} onClick={()=>setShowEmbedHelp(true)} className="linkStyle">
              取得方式
            </Tooltip>)
  };

  return (
    <InputGroup>
      <OverlayTrigger trigger="focus" placement="bottom" overlay={embedHelp}>
        <Form.Control
          placeholder="嵌入碼" aria-label="嵌入碼" size="sm" style={inputStyle}
          value={embedListData.embedInputRaw} onChange={onInputChange} />
      </OverlayTrigger>
      <InputGroup.Append>
        <Button variant="dark" size="sm" onClick={clearInput}>清除</Button>
        <Button variant="dark" size="sm" onClick={onAddClick}>加入</Button>
      </InputGroup.Append>
      <EmbedHelpModal
                show={showEmbedHelp}
                onHide={() => setShowEmbedHelp(false)}
              />
    </InputGroup>
  );
}

InputPanel.defaultProps = initialEmbedListDataState