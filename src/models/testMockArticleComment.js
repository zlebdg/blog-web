import { list as _list, post as _post } from '../services/articleComment'

export default {
  state: {
    comments: {
      page: 1,
      pageSize: 10,
      list: null,
    },
  },
  // 异步操作
  effects: {
    * post_({ payload }, { put, call }) {
      const response = yield call(_post)
      yield put({
        type: 'post',
        payload: response,
      })
    },
    * list_({ payload, callback }, { put, call }) {
      const response = yield call(_list, [1])
      console.log(payload)
      console.log(callback)
      if (200 === response.code) {
        yield put({
          type: 'list',
          payload: {
            comments: response.data,
          },
        })
      }
    },
    * comments({ payload, callback }, { put, call }) {
      const response = yield call(_list, [1])
      console.log(payload)
      console.log(callback)
      if (200 === response.code) {
        yield put({
          type: 'list',
          payload: {
            comments: response.data,
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
      return {
        ...state, ...action.payload,
      }
    },
  },
}
