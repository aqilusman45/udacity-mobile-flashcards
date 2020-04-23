import {RECEIVED_DATA, SWITCH_STATUS} from '../actions/loading';

export function loading(state = true, action) {
  switch (action.type) {
    case RECEIVED_DATA:
      return false;
    case SWITCH_STATUS:
      return action.status;
    default:
      return state;
  }
}
