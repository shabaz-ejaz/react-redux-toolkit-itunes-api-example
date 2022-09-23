import React from 'react';
import logo from './logo.svg';
import { Input, TextField } from '@mui/material';
import { Counter } from './features/counter/Counter';
import { MediaSearch } from './features/mediaSearch/MediaSearch';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <MediaSearch />
      </header>
    </div>
  );
}



export default App;
