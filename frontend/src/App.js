import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FareDetailsPage from './pages/FareDetailsPage';
import AboutPage from './pages/AboutPage';
import './App.css'

const App = () => {
  const [navTitle, setNavTitle] = React.useState('Search Flights')

  const handleUpdateNavTitle = (title) =>{
    setNavTitle(title)
  }

  const HomePageRenderer = (props) => {
    return <HomePage {...props} handleUpdateNavTitle={handleUpdateNavTitle} />
  }
  const FareDetailsPageRenderer = (props) => {
    return <FareDetailsPage {...props} handleUpdateNavTitle={handleUpdateNavTitle} />
  }
  const AboutPageRenderer = (props) => {
    return <AboutPage {...props} handleUpdateNavTitle={handleUpdateNavTitle} />
  }

  return (
    <Router>
      <Navbar navTitle={navTitle} />
        <div className="container mt-10 mx-auto px-4">
          <Route exact path='/' render={HomePageRenderer} />
          <Route exact path='/details' render={FareDetailsPageRenderer} />
          <Route exact path='/about' render={AboutPageRenderer} />
        </div>
      </Router>
  );
}

export default App;
