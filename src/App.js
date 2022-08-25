import React from 'react';
//components............
import Header from './components/Header';
import Home from './components/Home';

//styles............
import { GlobalStyle } from './GlobalStyle';


 
//const Start=()=> React.createElement('div',null,'this is a little start');

function App() {
  return (
   < div className="App">
    <Header/>
    <Home/>
    <GlobalStyle/>
   </div>
  );
  
}

export default App;
