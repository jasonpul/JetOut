import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import FareDetailsPage from './pages/FareDetailsPage';

const App = () => {
  return (
    <div className="container mt-20 mx-auto px-4">
        <Router>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/details' component={FareDetailsPage}/>
        </Router>
    </div>
  );
}

export default App;
