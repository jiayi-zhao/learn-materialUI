import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const rootElement = document.querySelector('#root');
if (rootElement) {
  ReactDOM.render(<App />, rootElement);
}