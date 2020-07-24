import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <div className="container mx-auto mt-20">
        <Router>
          <Route exact path='/' component={HomePage}/>
        </Router>
    </div>
  );
}

export default App;
