import { BlogListItem }                    from './data'
import { AnyAction, Reducer }              from 'redux'
import { blogListQuery as _blogListQuery } from './service'

export interface StateType {
  hasMoreItems: boolean
  page: number
  size: number
  total: number
  blogList: BlogListItem[]
  loading: boolean
}

export type Effect = (
  action: AnyAction,
  effects: AnyAction,
) => void;

export interface ModelType {
  // namespace: string;
  state: StateType;
  effects: {
    blogListQuery: Effect;
  };
  reducers: {
    blogListSave: Reducer<StateType>;
  };
}

const Model: ModelType = {
  state: {
    hasMoreItems: false,
    page: 0,
    size: 2,
    total: 0,
    blogList: [],
    loading: true,
  },

  effects: {
    * blogListQuery({ payload, callback }, { call, put }) {
      yield console.log(payload)
      const response = yield call(_blogListQuery, payload)
      if (response.code === 200) {
        yield put({
          type: 'blogListSave',
          payload: response.data,
        })
      }
    },
  },

  reducers: {
    blogListSave(state, { payload }) {
      console.log(state)
      console.log(payload)

      return {
        ...state,
        page: payload.number,
        size: payload.size,
        total: payload.totalPages,
        blogList: state.blogList.concat(payload.content),
        hasMoreItems: !payload.last,
      }
    },
  },
}

export default Model
