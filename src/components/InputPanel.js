import React, {useState} from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap';

export const InputPanel = ({addHandler}) => {
  const defaultInput = "<iframe src='https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FLeggyReki%2Fvideos%2F712018952592305%2F&show_text=0&width=560' style='border:none;overflow:hidden;width:100%;height:100%' scrolling='no' frameborder='0' allowTransparency='true' allowFullScreen='true'></iframe>";
  const [embedInput, setEmbedInput] = useState(defaultInput);
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
