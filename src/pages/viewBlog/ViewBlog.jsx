import styles from './index.less'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React from 'react'
import { Base64 } from 'js-base64'
import ArticleComment from './ArticleComment2'
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import { Avatar, BackTop, Button, Col, Comment, Form, Icon, Input, message, Row } from 'antd'
import moment from 'moment'
import { generateImgSrc as idcon } from '../../components/Img/DefaultAvatar'
import { connect } from 'dva'

// 代码高亮插件
BraftEditor.use(CodeHighlighter())

// 本页可解析的文章 parseType 标记
const parseType = 'draft-0.0.1'

// 用 braft-editor 编写提交的文本在展示时有小bug, 需要修改相应 class
const fixBraftBug = () => {
  // 清除高度, 默认是500px
  if (document.querySelector('.bf-content')) {
    document.querySelector('.bf-content').classList = ''
  }
  // 清除 .bf-hr .bf-media-toolbar, 当出现 <hr> 标签时, 显示异常
  if (document.querySelectorAll('.bf-hr')) {
    document.querySelectorAll('.bf-hr')
      .forEach(ele => {
        ele.innerHTML = '<hr><br>'
      })
    if (document.querySelector('.bf-hr')) {
      document.querySelector('.bf-hr').innerHTML = ''
    }
  }
  // 代码块高度, 超过400px出现滚动条
  if (document.querySelectorAll('.braft-code-block')) {
    document.querySelectorAll('.braft-code-block')
      .forEach(ele => {
        ele.style.minHeight = `${ ele.scrollHeight }px`
      })
  }
}

// comment 评论
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <Input.TextArea rows={ 4 } onChange={ onChange }/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={ submitting } onClick={ onSubmit } type="primary"
              className="pull-right">
        Add Comment
      </Button>
    </Form.Item>
  </div>
)

class ViewBlog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      article: {
        title: null,
        createAt: null,
        text: null,
        articleInfo: {
          id: null,
          like: null,
          dislike: null,
          star: null,
          comment: null,
          read: null,
        },
        author: {
          id: null,
          username: null,
          nickname: null,
          appId: null,
          avatar: null,
        },
      },
      comment: {
        submitting: false,
        text: '',
      },
      comments: {
        totalElements: 0,
        page: 1,
        size: 10,
        content: [],
      },
    }
  }

  reloadArticle = () => {
    this.props.dispatch({
      type: 'viewBlog/articleQuery',
      payload: { id: this.props.match.params.blogId },
      callback: (article) => {
        if (article.parseType && parseType === article.parseType) {
          const text = {
            text: BraftEditor.createEditorState(`${ decodeURIComponent(Base64.decode(article.text)) }`),
          }
          this.setState({
            article, ...text,
          }, () => {
            fixBraftBug()
          })
        } else {
          message.error(`不能够渲染的文章类型 ${ article.parseType }`)
        }
      },
    })
  }

  reloadComments = () => {
    this.props.dispatch({
      type: 'articleComment/commentsQuery',
      payload: {
        id: this.props.match.params.blogId,
        page: this.state.comments.page - 1,
        size: this.state.comments.size,
      },
      callback: (comments) => {
        this.setState(state => ({
          ...state,
          comments: {
            totalElements: comments.totalElements,
            content: comments.content,
            page: state.comments.page,
            size: state.comments.size,
          },
        }), () => {
          console.log(this.state)
        })
      },
    })
  }

  componentDidMount() {
    this.reloadArticle()
    this.reloadComments()
  }

  handleComment = () => {
    this.setState({
      comment: {
        submitting: true,
      },
    })

    // 评论即时显示
    setTimeout(() => {
      if (this.state.comments && this.state.comments.content) {
        if (this.state.comments.content.length >= this.state.comments.size) {
          // 弹出最后一个
          this.state.comments.content.pop()
        }
        // 开头插入
        this.state.comments.content.unshift({
          authorId: '06771b32-24d6-4110-8e0d-6ef2f45f431c',
          authorUsername: '另一位不愿多吃饭的网友',
          hash: 'hash',
          id: 0,
          parseType: '0.0.1',
          text: '信你个鬼...',
        })
      }

      this.setState(({ comments }) => {
          return {
            comments: {
              totalElements: comments.totalElements + 1,
            },
          }
        },
      )

      // 只要调用到了 setState 也会同时更新 content
      this.setState({
        comment: {
          submitting: false,
        },
      })
    }, 200)
  }

  render() {
    return (
      <Row justify="space-around" type="flex">
        <Col xxl={ 16 } xl={ 18 } lg={ 18 } span={ 24 }>
          <div style={ {
            backgroundColor: 'white',
            padding: '8px',
          } }>

            <div>
              <h1 style={ { textAlign: 'center' } }>
                <span style={ { fontSize: '32px' } }>{ this.state.article.title }</span></h1>
            </div>

            <div style={ { textAlign: 'center' } }>
              <div className={ styles.extra }>
                <span style={ { margin: '0 15px' } }>
                  <Avatar
                    src={ this.state.article.author.avatar
                      ? this.state.article.author.avatar
                      : idcon(this.state.article.author.username) }
                    alt="alt" size="small"/>
                  <a> { this.state.article.author.username } </a>发布于
                  {
                    moment(this.state.article.createAt)
                      .format('YYYY-MM-DD HH:mm:ss')
                  }
                </span>
                <span style={ { margin: '0 15px' } }>
                  <span style={ {
                    margin: '0 0.5em',
                    display: 'inline-block',
                  } }>
                    <Icon type="like-o"/> { this.state.article.articleInfo.like }
                  </span> |
                  <span style={ {
                    margin: '0 0.5em',
                    display: 'inline-block',
                  } }>
                    <Icon type="dislike-o"/> { this.state.article.articleInfo.dislike }
                  </span> |
                  <span style={ {
                    margin: '0 0.5em',
                    display: 'inline-block',
                  } }>
                    <Icon type="star-o"/> { this.state.article.articleInfo.star }
                  </span> |
                  <span style={ {
                    margin: '0 0.5em',
                    display: 'inline-block',
                  } }>
                    <Icon type="message"/> { this.state.article.articleInfo.comment }
                  </span>|
                  <span style={ {
                    margin: '0 0.5em',
                    display: 'inline-block',
                  } }>
                    <Icon type="read"/> { this.state.article.articleInfo.read }
                  </span>
                </span>
              </div>
            </div>

            <BraftEditor
              value={ this.state.text }
              controls={ [] }
              readOnly="true"
            />
          </div>
          <hr/>
          <Row style={ {
            backgroundColor: 'white',
            paddingBottom: '20px',
          } } justify="space-around" type="flex">
            <Col xxl={ 16 } xl={ 18 } lg={ 18 } span={ 22 }>
              <Comment
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                content={ <Editor value={ this.state.comment.text } onChange={ (e) => {
                  this.setState({
                    comment: {
                      text: e.target.value,
                    },
                  })
                } } onSubmit={ this.handleComment } submitting={ this.state.comment.submitting }/>
                }/>

              <ArticleComment comments={ this.state.comments } pagination={ {
                onChange: (page, pageSize) => {
                  this.state.comments.page = page
                  this.state.comments.size = pageSize
                  this.reloadComments()
                },
                current: this.state.comments.page,
                pageSize: this.state.comments.size,
                total: this.state.comments.totalElements,
              } }/>
            </Col>
          </Row>
        </Col>
        <BackTop/>
      </Row>
    )
  }
}

export default connect((state, { articleComment, loading }) => {
  return {
    articleComment,
    loading,
  }
})(ViewBlog)
