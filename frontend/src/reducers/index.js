import { combineReducers } from 'redux';
import categories from '../reducers/categories';
import posts from '../reducers/posts';

export default combineReducers({ categories, posts });
