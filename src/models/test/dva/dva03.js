import { query as reqQuery } from '../../../services/test/dva/dva03'

export default {
  state: {
    aa: 'hehe',
    count: null,
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   history.listen((pathname, query) => {
    //       console.log(pathname)
    //       console.log(query)
    //     },
    //   )
    // },
  },
  // 异步操作
  effects: {
    * _query({ payload }, { put, call }) {
      const resp = yield call(reqQuery)
      if (resp && 200 === resp.code) {
        yield  put({
          type: 'query',
          payload: {
            count: resp.data,
          },
        })
      }
    },
    * post_(_, { put, call }) {
    },
  },
  // 同步操作
  reducers: {
    query(state, action) {
      let count = 1
      if (state.count) {
        count = state.count + 1
      }
      state = {
        aa: 'haha',
        count: count,
      }
      return {
        ...state, ...action.payload,
      }
    },
    post(state, action) {
      state = {
        aa: 'haha',
        count: -1,
      }
      return {
        ...state, ...action.payload,
      }
    },
  },
}
