import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
}
const authData = {
  Authentication: false,
}

const changeState = (state = initialState, { type, ...rest }, authData) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'UserLogin':
      return { ...authData, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store;
