export default {
  state: {
    aa: 'hehe',
    count: null,
  },
  // 异步操作
  effects: {
    * _query({ payload }, { put, call }) {
    },
    * post_({ payload }, { put, call }) {
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
        ...state,
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
