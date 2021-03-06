import React, { useState } from 'react';
import './App.css';
import ArticleFinder from './components/FunctionalArticleFinder';

const App = () => {

  const [isOpen, setIsOpen] = useState(false)

  

  return isOpen ? 
      <ArticleFinder closeFinder={() => setIsOpen(false)}/> : 
      <div>
        <h1>Article Finding Application Homepage</h1>
        <button 
          style={{
            backgroundColor: 'blue', 
            color: 'white', 
            fontSize: 25, 
            padding: '25px'}}
          onClick={()=>setIsOpen(true)}>
          Open Article Finder
        </button>
      </div>
}

export default App;
