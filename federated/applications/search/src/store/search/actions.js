import { SEARCH_ACTION } from './actionConsts';

const searchAction = (payload) => ({
  type: SEARCH_ACTION,
  payload
})

export {
  searchAction
}