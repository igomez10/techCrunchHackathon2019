import React from 'react';
import './App.css';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import {ConnectedClientList} from './components/ConnectedClientList'

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <CSSReset />
        <ConnectedClientList />
      </ThemeProvider>
    </div>
  );
}

export default App;
