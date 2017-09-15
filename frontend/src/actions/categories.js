import * as api from '../utils/api';

export const ADD_CATEGORIES = 'ADD_CATEGORIES';

export const addCategories = categories => ({
  type: ADD_CATEGORIES,
  categories,
});

export const getCategories = () => dispatch =>
  api.getCategories().then(categories => dispatch(addCategories(categories)));
