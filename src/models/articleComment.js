import { list as _list, post as _post } from '../services/articleComment'

export default {
  state: {
    commentList: null,
  },
  // 异步操作
  effects: {
    * post_({ payload }, { put, call }) {
      const response = yield call(_post)
      console.log(response)
      yield put({
        type: 'post',
        payload: response,
      })
    },
    * list_({ payload }, { put, call }) {
      const response = yield call(_list, [1])
      console.log(response)
      if (200 === response.code) {
        yield put({
          type: 'list',
          payload: {
            commentList: response.data,
          },
        })
      }
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
    list(state, action) {
      console.log(state)
      console.log(action)
      return {
        ...state, ...action.payload,
      }
    },
  },
}
