import { extend } from 'umi-request'
import basicErrorHandler from './errorHandler'

const request = extend({
  maxCache: 10,
  errorHandler: (error) => {
    console.log(error)
  },
  credentials: 'include',
})

export async function access(queryString) {
  return request(`/login${ queryString }`, {
    // headers: {
    //   accept: 'application/json',
    // },
    // errorHandler: basicErrorHandler,
  })
}
