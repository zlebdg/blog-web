import { post as _post } from '../services/articleComment'

export default {
  state: {
    aa: 'hehe',
    count: null,
  },
  // 异步操作
  effects: {
    * post_({ payload }, { put, call }) {
      const reaponse = yield call(_post)
      console.log(reaponse)
      put({
        type: 'post',
        payload: reaponse,
      })
    },
  },
  // 同步操作
  reducers: {
    post(state, action) {
      console.log(state)
      console.log(action)
      return {
        ...state,
      }
    },
  },
}
