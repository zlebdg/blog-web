export default {
  state: {
    aa: 'hehe',
  },
  // 异步请求
  effects: {
    * query({ payload }, { put, call }) {
      yield console.log(1)
    },
    * post({ payload }, { put, call }) {
      yield console.log(1)
    },
  },
  reducers: {
    save(state, action) {
      state = {
        aa: 'haha',
      }
      return {
        ...state, ...action.payload,
      }
    },
  },
}
