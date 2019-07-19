import React from 'react';
import './App.scss';
import { InputContainer } from './containers/InputContainer'
import { EmbedContainer } from './containers/EmbedContainer'


function App() {
  return (
    <div className="App">
      <div className="InputContainer">
        <InputContainer />
      </div>
      <div className="EmbedContainer">
        <EmbedContainer />
      </div>
      
    </div>
    
  );
}

export default App;
