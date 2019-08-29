import React, { PureComponent } from 'react'
import { BlogListItem }         from '@/pages/blog-list/data'
import { Avatar, Card, Icon }   from 'antd'
import { Base64 }               from 'js-base64'
import { generateImgSrc }       from '@/components/Img/DefaultAvatar'
import moment                   from 'moment'
import { router }               from 'umi'

class Index extends PureComponent<{ data: BlogListItem }> {
  render(): any {
    const { data } = this.props
    console.log(data)
    return (
      <div style={ { width: '100%' } } key={ data.id }>
        <Card title={ data.title } hoverable
              onClick={ () => {
                router.push(`/public/viewBlog/blogId/${ data.id }`)
              } }
              headStyle={ { textAlign: 'center' } }
              bodyStyle={ { textAlign: 'center', paddingTop: '20px' } }>
          <div>
            <span>
              <Avatar
                src={ generateImgSrc(data.author.username) }
                alt="alt" size="small"/>
                  <a> { data.author.username } </a>发布于
              {
                moment(data.createAt).format('YYYY-MM-DD HH:mm:ss')
              }
            </span>
            <span>
              <span style={ {
                display: 'inline-block',
              } }>
                <Icon type="like-o"/> { data.articleInfo ? data.articleInfo.like : 0 }
              </span> |
              <span style={ {
                display: 'inline-block',
              } }>
                <Icon type="dislike-o"/> { data.articleInfo ? data.articleInfo.dislike : 0 }
              </span> |
        <span style={ {
          display: 'inline-block',
        } }>
          <Icon type="star-o"/> { data.articleInfo ? data.articleInfo.star : 0 }
        </span> |
        <span style={ {
          display: 'inline-block',
        } }>
          <Icon type="message"/> { data.articleInfo ? data.articleInfo.comment : 0 }
        </span>|
        <span style={ {
          display: 'inline-block',
        } }>
          <Icon type="read"/> { data.articleInfo ? data.articleInfo.read : 0 }
        </span>
      </span>
          </div>
          { data.parseType === 'draft-0.0.1' && data.preview }
          { data.parseType === '0.0.2' && Base64.decode(data.preview) }
        </Card>
      </div>
    )
  }
}

export default Index
