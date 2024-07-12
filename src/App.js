import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MajorCategories from './components/MajorCategories';
import Categories from './components/Categories';
import DrillPage from './components/DrillPage';
import NavButtons from './components/NavButtons';

function App() {
  return (
    <Router>
      <div className="App">
        <NavButtons />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/categories" element={<MajorCategories />} />
          <Route path="/categories/:majorCategory" element={<Categories />} />
          <Route path="/drill/:majorCategory/:category" element={<DrillPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;