import React from 'react';
//components............
import Header from './components/Header';

//styles............
import { GlobalStyle } from './GlobalStyle';


 
//const Start=()=> React.createElement('div',null,'this is a little start');

function App() {
  return (
   < div className="App">
    <Header/>
    Start here.
    <GlobalStyle/>
   </div>
  );
  
}

export default App;
