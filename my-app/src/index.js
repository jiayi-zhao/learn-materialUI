import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { render } from 'react-dom';

const rootElement = document.querySelector('#root');
if (rootElement) {
  ReactDOM.render(<App />, rootElement);
}