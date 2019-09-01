import React, { PureComponent }         from 'react'
import { Button, Col, List, Row, Spin } from 'antd'
import { connect }                      from 'dva'
import { StateType }                    from '@/pages/blog-list/model'
import BlogItem                         from './components/BlogItem'
import ScrollToWhere                    from '../../components/ScrollToWhere'

@connect(({ model, loading }) => ({ model, loading }))
class Index extends PureComponent {
  componentDidMount(): void {
    if (!this.props.model.blogList || !(this.props.model.blogList.length * 1 > 0)) {
      this.props.dispatch({
        type: 'model/blogListQuery',
        payload: {
          page: this.props.model.page,
          size: this.props.model.size,
        },
      })
    }
  }

  loadMore = () => {
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
      <Row justify="space-around" type="flex">
        <Col xxl={ 16 } xl={ 18 } lg={ 18 } span={ 24 }>
          <div>
            <List itemLayout="horizontal" bordered={ false } loading={ loading.effects['model/blogListQuery'] }
                  loadMore={
                    loading.effects['model/blogListQuery'] && (
                      <div style={ { textAlign: 'center' } }>
                        <Spin/>
                      </div>
                    )
                    || model.hasMoreItems && (
                      <div style={ { textAlign: 'center', marginTop: '12px' } }>
                        <Button type="ghost" onClick={ this.loadMore }>加载更多..</Button>
                      </div>
                    )
                    || (
                      <div style={ { textAlign: 'center', marginTop: '12px' } }>
                        无更多内容
                      </div>
                    )
                  }
                  dataSource={ model.blogList }
                  renderItem={ item => {
                    return (
                      <List.Item>
                        <BlogItem data={ item }></BlogItem>
                      </List.Item>
                    )
                  } }/>
            {
              // 加载完毕再滚动
              !loading.effects['model/blogListQuery'] && (
                <ScrollToWhere/>
              )
            }
          </div>
        </Col>
      </Row>
    )
  }
}

export default Index
