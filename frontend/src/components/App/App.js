import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Categories from '../Categories/Categories';
import Posts from '../Posts/Posts';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Redux Nanodegree&apos;s Project: Readable</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Categories />
        <Posts />
      </div>
    );
  }
}

export default App;
