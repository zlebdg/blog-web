// 导入组件记得加花括号
import { userLogin } from '@/services/userLogin'

const UserLoginModel = {
  namespace: 'userLogin',
  state: {
    username: 'model - username',
    message: 'model - message',
  },
  effects: {
    * userLogin(_, { call, put }) {
      const response = yield call(userLogin)
      yield put({
        type: 'userLoginR',
        payload: response,
      })
    },
  },
  reducers: {
    userLoginR(state, resp) {
      if (resp.payload.username) {
        return {
          username: resp.payload.username,
          message: resp.payload.message,
        }
      }
      return state
    },
  },
}

export default UserLoginModel
