import React, { PureComponent } from 'react'
import { BlogListItem }         from '@/pages/blog-list/data'
import { Card }                 from 'antd'
import { Base64 }               from 'js-base64'
import { router }               from 'umi'
import ArticleAuthorInfo        from '../ArticleAuthorInfo'
import ArticleCommentInfo       from '../ArticleCommentInfo'

class Index extends PureComponent<{ data: BlogListItem }> {
  render(): any {
    const { data } = this.props
    return (
      <div style={ { width: '100%' } } key={ data.id }>
        <Card title={ data.title } hoverable
              onClick={ () => {
                router.push(`/public/viewBlog/blogId/${ data.id }`)
              } }
              headStyle={ { textAlign: 'center' } }
              bodyStyle={ { textAlign: 'center', paddingTop: '20px' } }>
          <div>
            <ArticleAuthorInfo
              author={ data.author }
              createAt={ data.createAt }/>
            <ArticleCommentInfo
              articleInfo={ data.articleInfo }/>
          </div>
          { data.parseType === 'draft-0.0.1' && data.preview }
          { data.parseType === '0.0.2' && Base64.decode(data.preview) }
        </Card>
      </div>
    )
  }
}

export default Index
