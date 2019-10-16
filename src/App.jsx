import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './components/Container';


ReactDOM.render(
  <Router>
    <Container />
  </Router>,
  document.querySelector('#target'),
);
