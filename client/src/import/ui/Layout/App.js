import React from 'react';
import './App.scss';
import QuillTextEditor from '../customPages/QuillComponent/QuillTextEditor';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <QuillTextEditor/>
      </div>
    );
  }
}

export default App;
