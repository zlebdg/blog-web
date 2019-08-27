export default {
  state: {
    aa: 'hehe',
  },
  // 异步请求
  effects: {
    * query({ payload }, { put, call }) {
    },
    * post({ payload }, { put, call }) {
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
