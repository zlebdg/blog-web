import { articleQuery as _articleQuery } from '../services/viewBlog'

export default {
  state: {
    comments: {
      totalElements: 0,
      size: 10,
    },
  },
  // 异步操作
  effects: {
    * articleQuery({ payload, callback }, { put, call }) {
      const response = yield call(_articleQuery, payload)
      if (200 === response.code) {
        callback(response.data)
      }
    },
  },
  // 同步操作
  reducers: {},
}
