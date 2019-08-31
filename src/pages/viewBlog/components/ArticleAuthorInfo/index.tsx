import React, { PureComponent }    from 'react'
import { BlogListItem }            from '@/pages/blog-list/data'
import { Avatar }                  from 'antd'
import { generateImgSrc as idcon } from '@/components/Img/DefaultAvatar'
import moment                      from 'moment'

class Index extends PureComponent<{ data: BlogListItem }> {
  render(): any {
    const { author, createAt } = this.props
    if (!author) {
      return (<></>)
    }

    return (
      <span style={ { margin: '0 15px' } }>
        <Avatar
          src={ author.avatar
            ? author.avatar
            : idcon(author.username) }
          alt="alt" size="small"/>
      <a> { author.username } </a>发布于
        {
          createAt && moment(createAt)
            .format('YYYY-MM-DD HH:mm:ss')
        }
      </span>
    )
  }
}

export default Index
