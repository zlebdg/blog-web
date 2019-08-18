export default {
  state: {
    aa: 'hehe',
    count: null,
  },
  // 异步操作
  effects: {
    * _query({ payload }, { put, call }) {
      yield console.log('调用了异步方法 _query')
    },
    * post_({ payload }, { put, call }) {
      yield console.log('调用了异步方法 post_')
    },
  },
  // 同步操作
  reducers: {
    query(state, action) {
      console.log(state)
      console.log(action)
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
      console.log(state)
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
