import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';
import { fetchCategories } from '../actions/index';

class Categories extends Component {
  componentDidMount() {
    this.props.loadCategories();
  }

  render() {
    const { categories } = this.props;

    if (!categories) {
      return null;
    }

    return (
      <Jumbotron>
        <Grid>
          <h2>Categories</h2>
          <ListGroup>
            {categories.map(category => (
              <ListGroupItem key={category.name} href={`/${category.path}`}>
                {category.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Grid>
      </Jumbotron>
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);