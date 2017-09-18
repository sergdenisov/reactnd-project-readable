import React from 'react';
import PropTypes from 'prop-types';
import Posts from '../Posts/Posts';

const CategoryView = props => <Posts category={props.match.params.category} />;

CategoryView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default CategoryView;
