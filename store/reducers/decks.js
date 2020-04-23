import {SET_DECKS, ADD_DECK} from '../actions/decks';
import {RECEIVED_DATA} from '../actions/loading';
export const decks = (state = {}, action) => {
  switch (action.type) {
    case SET_DECKS:
    case RECEIVED_DATA:
      return {...action.decks};
    case ADD_DECK:
      return {...state, ...action.deck};
    default:
      return state;
  }
};
