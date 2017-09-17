import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Categories = props => (
  <Jumbotron>
    <Grid>
      <h2>Categories</h2>
      <ListGroup>
        {props.categories.map(category => (
          <LinkContainer to={`/${category.path}`} key={category.name}>
            <ListGroupItem>{category.name}</ListGroupItem>
          </LinkContainer>
        ))}
      </ListGroup>
    </Grid>
  </Jumbotron>
);

function mapStateToProps({ categories }) {
  return { categories };
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Categories);
