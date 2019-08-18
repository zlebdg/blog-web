import { comments as _comments } from '../services/articleComment'

export default {
  state: {
    comments: {
      totalElements: 0,
      size: 10,
    },
  },
  // 异步操作
  effects: {
    * commentsQuery({ payload }, { put, call }) {
      console.log(payload)
      if (!payload) {
        return
      }

      const response = yield call(_comments, payload.id, payload.page - 1, payload.size)
      if (200 === response.code) {
        yield put({
          type: 'commentsSave',
          payload: {
            comments: response.data,
          },
        })
      }
    },
  },
  // 同步操作
  reducers: {
    commentsSave(state, action) {
      console.log(action)
      return {
        ...state, ...action.payload,
      }
    },
  },
}
