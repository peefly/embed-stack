import React, {useState} from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap';
import { getEmbedData } from './InputOperator'

export const InputPanel = ({addHandler}) => {
  const defaultInput = '<iframe width="560" height="315" src="https://www.youtube.com/embed/oiz3m_4Wmik" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  const [embedInput, setEmbedInput] = useState(defaultInput);
  const onInputChange = (evt) => setEmbedInput(evt.target.value);
  const onAddClick = () => {
    if (embedInput === "") return;
    let processedData = getEmbedData(embedInput);
    addHandler(processedData);
    //clearInput();
  }
  const clearInput = () => setEmbedInput("");
  const inputStyle = {
    backgroundColor: "#333",
    color: "#aaa",
    border: "0px solid #fff"
  }

  return (
    <InputGroup className="mb-12">
      <Form.Control
        placeholder="嵌入碼" aria-label="嵌入碼" size="sm"  style={inputStyle}
        value={embedInput} onChange={onInputChange} />
      <InputGroup.Append>
      <Button variant="dark" size="sm" onClick={clearInput}>清除</Button>
          <Button variant="dark" size="sm" onClick={onAddClick}>加入</Button>
        
      </InputGroup.Append>
    </InputGroup>
  );
}

InputPanel.defaultProps = {
  addHandler: (e) => {alert("default addHandler");}
}
