import React, {useState} from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap';

export const InputPanel = ({addHandler}) => {
  const [embedInput, setEmbedInput] = useState("");
  const onInputChange = (evt) => setEmbedInput(evt.target.value);
  const onAddClick = () => {
    addHandler(embedInput);
    setEmbedInput("");
  }

  return (
    <InputGroup className="mb-12">
      <Form.Control
        placeholder="嵌入碼" aria-label="嵌入碼" size="sm" 
        value={embedInput} onChange={onInputChange} />
      <InputGroup.Append>
        
          <Button variant="dark" size="sm" onClick={onAddClick}>
              Add
          </Button>
        
      </InputGroup.Append>
    </InputGroup>
  );
}

InputPanel.defaultProps = {
  addHandler: (e) => {alert("default addHandler");}
}
