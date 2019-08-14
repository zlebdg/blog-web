export default {
  state: {
    aa: 'hehe',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((pathname, query) => {
          console.log(pathname)
          console.log(query)
        },
      )
    },
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
