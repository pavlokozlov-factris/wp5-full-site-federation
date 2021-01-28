import { SET_USERNAME_ACTION } from './actionConsts';

const setUsername = (payload) => ({
  type: SET_USERNAME_ACTION,
  payload
})

export {
  setUsername
}