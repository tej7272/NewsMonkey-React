import './App.css';
import React, {useState} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";

const App=()=>{
  const pageSize = 9;
  const apiKey=process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  return(
    <div>
     <Router>
     <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
        <Navbar />
        <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={9} category="general" country="in"/>} />
        <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} category="technology" country="in"/>} />
        <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} category="science" country="in"/>} />
        <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} category="sports" country="in"/>} />
        <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} category="entertainment" country="in"/>} />
        <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} category="business" country="in"/>} />
        <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} category="health" country="in"/>} />
        </Routes>
      </Router>
    </div>
  )}

  
export default App;

