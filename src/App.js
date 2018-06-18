import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Graph from './components/Graph.js'

const names = [
  'Ada', 'Ann', 'Bob', 'Cathy', 'Clara', 'Charles', 'Doris',
  'Danny', 'Felton', 'Felix', 'George', 'Iris', 'Jack', 'Ken',
  'Lauren', 'Martin', 'Noel', 'Olivia', 'Peter', 'Rachel',
  'Sunny', 'Tim', 'Tiffany', 'Vince', 'Wilson', 'Wendy',
  'Xavier', 'Yvonne', 'Zoe'
]

const persons = names.map(name => ({name: name, friends: []}))

persons.forEach(p => {
  persons.forEach(p2 => {
    if (p.name !== p2.name) {
      p.friends.push(p2)
    }
  })
})

let data = [
  {
    name: 'Peter',
    age: 28,
    friends: [
      {
        name: 'Tom',
        age: 31,
        attr: [1,2,3],
        siblings: {
          name: 'Mary'
        }
      },
      {
        name: 'Jack',
        age: 29
      }
    ]
  }

]

data = persons


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Graph data={data} />
      </div>
    )
  }
}

export default App;
