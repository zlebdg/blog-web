import { logout } from '../services/home'

// import { parse, stringify } from 'qs'
// parse('')
// stringify({})

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    * logout(_, {call, put}) {
      const response = yield call(logout)
      if (200 === response.code) {
        sessionStorage.removeItem('currentUser')
      }
      yield put({
        type: 'user/fetchCurrent',
      })
    },
  },
  reducers: {},
}
export default Model
