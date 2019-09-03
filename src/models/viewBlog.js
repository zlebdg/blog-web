import {
  articleQuery as _articleQuery,
  comment as _comment,
  readPlus as _readPlus,
  like as _like,
} from '../services/viewBlog'

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
    * comment({ payload, callback }, { put, call }) {
      const response = yield call(_comment, payload)
      if (200 === response.code) {
        callback(response.data)
      }
    },
    * readPlus({ payload, callback }, { put, call }) {
      const response = yield call(_readPlus, payload)
      if (200 === response.code) {
        callback(response.data)
      }
    },
    * like({ payload, callback }, { put, call }) {
      const response = yield call(_like, payload)
      if (200 === response.code) {
        callback(response.data)
      }
    },
  },
  // 同步操作
  reducers: {},
}
