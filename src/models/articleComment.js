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
    * commentsQuery({ payload, callback }, { put, call }) {
      const response = yield call(_comments, payload.id, payload.page, payload.size)
      if (200 === response.code) {
        callback(response.data)
      }
    },
  },
  // 同步操作
  reducers: {},
}
