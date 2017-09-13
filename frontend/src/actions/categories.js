import * as API from '../utils/API';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const fetchCategories = () => dispatch =>
  API.fetchCategories().then(categories =>
    dispatch(receiveCategories(categories)),
  );
