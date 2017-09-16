import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getCategories } from '../../actions/categories';

class Categories extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <Jumbotron>
        <Grid>
          <h2>Categories</h2>
          <ListGroup>
            {categories.map(category => (
              <LinkContainer
                to={`/categories/${category.path}`}
                key={category.name}>
                <ListGroupItem>{category.name}</ListGroupItem>
              </LinkContainer>
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
    actions: bindActionCreators({ getCategories }, dispatch),
  };
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.PropTypes.shape({
    getCategories: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
