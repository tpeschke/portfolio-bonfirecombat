import React, { Component } from 'react';
import './reset.css'
import './App.css';

import axios from 'axios'

class App extends Component {
  constructor() {
    super()

    this.state = {
      fighters: ''
    }
  }

  getAll = () => {
    axios.get('/api/fighters').then( (req, res) => {

        var combat = JSON.stringify(req.data[0])
        
        this.setState( { fighters: combat } )
    })
  }

  render() {

    return (
      <div>
        <button onClick={this.getAll}>present</button>
        {this.state.fighters}
      </div>
    );
  }
}

export default App;
