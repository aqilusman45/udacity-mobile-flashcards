import {createStore, combineReducers} from 'redux';
import {decks} from './reducers/decks';
import {loading} from './reducers/loading';
import middleware from './middleware';

export default createStore(
  combineReducers({
    decks,
    loading,
  }),
  middleware,
);
