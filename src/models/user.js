import { currentUser as queryCurrentUser } from '@/services/home'

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    * fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrentUser)
      if (response.code === 200) {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        })
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      }
    },
  },
}
export default UserModel
