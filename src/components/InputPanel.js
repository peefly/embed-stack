import React from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap';
import { getEmbedData } from './InputOperator'
import { initialEmbedListDataState } from 'reducers/AppReducer'

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
    border: "0px solid #fff"
  }

  return (
    <InputGroup className="mb-12">
      <Form.Control
        placeholder="嵌入碼" aria-label="嵌入碼" size="sm"  style={inputStyle}
        value={embedListData.embedInputRaw} onChange={onInputChange} />
      <InputGroup.Append>
      <Button variant="dark" size="sm" onClick={clearInput}>清除</Button>
          <Button variant="dark" size="sm" onClick={onAddClick}>加入</Button>
        
      </InputGroup.Append>
    </InputGroup>
  );
}

InputPanel.defaultProps = initialEmbedListDataState