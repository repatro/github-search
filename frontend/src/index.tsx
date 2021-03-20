import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import './index.css';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 0.05em;
    background-color: #fbfcfe;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
