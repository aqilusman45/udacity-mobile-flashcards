import {
  addDeck,
  getDecks,
  removeDeckFromDecks,
  addCardToDeck,
} from '../../utils/helpers';
import {switchLoadingStatus, receiveData} from './loading';
export const SET_DECKS = 'SET_DECKS';
export const ADD_DECK = 'ADD_DECK';

export const setDecks = decks => ({
  type: SET_DECKS,
  decks,
});

export const addDeckToStore = deck => ({
  type: ADD_DECK,
  deck,
});

export const setNewDeck = (title, cb) => {
  return async dispatch => {
    try {
      const id = await addDeck(title);
      dispatch(setDecks(await getDecks()));
      cb(id);
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromDeck = (title, cb) => {
  return async dispatch => {
    try {
      dispatch(switchLoadingStatus(true));
      await removeDeckFromDecks(title);
      dispatch(receiveData(await getDecks()));
      cb();
    } catch (error) {
      console.log(error);
    }
  };
};

export const addCard = ({title, question, answer}, cb) => {
  return async dispatch => {
    try {
      await addCardToDeck(title, {question, answer});
      dispatch(setDecks(await getDecks()));
      cb();
    } catch (error) {
      console.log(error);
    }
  };
};
