import React, { PureComponent } from 'react'
import { Button, List }         from 'antd'
import { connect }              from 'dva'
import { StateType }            from '@/pages/blog-list/model'

@connect(({ model, loading }) => {
  return ({ model, loading })
})
class Index extends PureComponent {
  componentDidMount(): void {
    this.props.dispatch({
      type: 'model/blogListQuery',
      payload: {
        page: this.props.model.page,
        size: this.props.model.size,
      },
    })
  }

  loadMore = () => {
    console.log(this.props)
    this.props.dispatch({
      type: 'model/blogListQuery',
      payload: {
        page: this.props.model.page * 1 + 1,
        size: this.props.model.size,
      },
    })
  }

  render(): any {
    const { model, loading } = this.props
    model as StateType
    return (
      <div>
        <List itemLayout="horizontal" bordered={ false } loading={ loading.effects['model/blogListQuery'] }
              loadMore={ !loading.effects['model/blogListQuery'] && model.hasMoreItems ?
                <div style={ { textAlign: 'center', marginTop: '12px' } }>
                  <Button type="ghost" onClick={ this.loadMore }>加载更多..</Button>
                </div> : null }
              dataSource={ model.blogList }
              renderItem={ item => (
                <List.Item>
                  { JSON.stringify(item) }
                </List.Item>
              ) }/>
      </div>
    )
  }
}

export default Index
