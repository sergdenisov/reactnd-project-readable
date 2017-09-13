import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Navbar,
  Jumbotron,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { fetchCategories } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.loadCategories();
  }

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
        <Jumbotron>
          <Grid>
            <h2>Categories</h2>
            <ListGroup>
              {this.props.categories &&
                this.props.categories.map(category => (
                  <ListGroupItem key={category.name} href={`/${category.path}`}>
                    {category.name}
                  </ListGroupItem>
                ))}
            </ListGroup>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(fetchCategories()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
