export const RECEIVED_DATA = 'RECEIVED_DATA';
export const SWITCH_STATUS = 'SWITCH_STATUS';

export const receiveData = decks => ({
  type: RECEIVED_DATA,
  decks,
});

export const switchLoadingStatus = status => ({
  type: SWITCH_STATUS,
  status,
});
