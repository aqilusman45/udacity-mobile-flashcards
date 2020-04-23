export const logger = store => next => action => {
  console.group(action.type);
  console.log('the action', action);
  const returnedValue = next(action);
  console.log('new state', store.getState());
  console.groupEnd();
  return returnedValue;
};
