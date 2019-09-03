import styles from './index.less'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React from 'react'
import { Base64 } from 'js-base64'
import ArticleComment from './ArticleComment2'
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import { Button, Col, Comment, Form, Input, message, Row, Spin } from 'antd'
import { createImg } from '../../components/GithubEmoji'
import DefaultAvatar from '../../components/Img/DefaultAvatar'
import { connect } from 'dva'
import ArticleAuthorInfo from './components/ArticleAuthorInfo'
import ArticleCommentInfo from './components/ArticleCommentInfo'
import ScrollToWhere from '../../components/ScrollToWhere'
// 官方表情包扩展, 文档 https://braft.margox.cn/demos/emoticon
// 引入表情包组件样式文件
import 'braft-extensions/dist/emoticon.css'
// 引入表情包组件和默认表情包列表
import Emoticon, { defaultEmoticons } from 'braft-extensions/dist/emoticon'
// 转换默认表情包列表，让webpack可以正确加载到默认表情包中的图片，请确保已对png格式的文件配置了loader
const emoticons = defaultEmoticons.map(item => require(`braft-extensions/dist/assets/${ item }`))
// 也可以使用自己的表情包资源
// const emoticons = [
//   'https://github.githubassets.com/images/icons/emoji/unicode/1f622.png?v8',
//   'https://github.githubassets.com/images/icons/emoji/unicode/1f622.png?v8',
// ]
// BraftEditor.use(Emoticon({ emoticons }))

// 表情包扩展和代码高亮插件
BraftEditor.use([Emoticon({
  excludeEditors: ['BraftEditor-NewBlog'],
  // includeEditors: ['BraftEditor-ViewBlog'],
  emoticons,
}), CodeHighlighter()])

// 本页可解析的文章 parseType 标记
const parseTypes = ['draft-0.0.1', '0.0.2']

// 用 braft-editor 编写提交的文本在展示时有小bug, 需要修改相应 class
const fixBraftBug = () => {
  setTimeout(() => {
    // 清除高度, 默认是500px
    if (document.querySelector('.bf-content')) {
      document.querySelector('.bf-content').classList = ''
    }
    // 清除 .bf-hr .bf-media-toolbar, 当出现 <hr> 标签时, 显示异常
    if (document.querySelectorAll('.bf-hr')) {
      document.querySelectorAll('.bf-hr')
        .forEach(ele => {
          ele.innerHTML = '<hr>'
        })
    }
    // 代码块高度, 超过400px出现滚动条
    if (document.querySelectorAll('.braft-code-block')) {
      document.querySelectorAll('.braft-code-block')
        .forEach(ele => {
          ele.style.minHeight = `${ ele.scrollHeight }px`
        })
    }
    // 加入 Emoticon 表情包扩展后引发的
    if (document.querySelector('.bf-controlbar')) {
      document.querySelector('.bf-controlbar')
        .remove()
    }
  }, 1)
}

class ViewBlog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      article: {
        id: null,
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

  componentDidMount() {
    this.state.article.id = this.props.match.params.blogId
    this.reloadArticle()
    this.reloadComments()
    this.readPlus()
  }

  readPlus = () => {
    const prefix = 'ARTICLE-READ-'
    const id = this.state.article.id
    const key = `${ prefix }${ this.state.article.id }`
    if (sessionStorage.getItem(key) === null) {
      this.props.dispatch({
        type: 'viewBlog/readPlus',
        payload: { id },
        callback: (data) => {
          sessionStorage.setItem(key, 1)
          this.setState(state => ({
            ...state,
            article: {
              ...state.article,
              articleInfo: {
                ...state.article.articleInfo,
                read: data,
              },
            },
          }))
        },
      })
    }
  }

  reloadArticle = () => {
    this.props.dispatch({
      type: 'viewBlog/articleQuery',
      payload: { id: this.state.article.id },
      callback: (article) => {
        if (article.parseType && parseTypes.indexOf(article.parseType) >= 0) {
          const content = createImg(`${ Base64.decode(article.text) }`)
          const text = {
            text: BraftEditor.createEditorState(content),
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
        })
      },
    })
  }

  handleComment = () => {
    if (null === this.state.comment
      || null === this.state.comment.text
      || '' === this.state.comment.text
    ) {
      message.error('评论内容为空')
      return
    }

    this.setState(state => ({
      ...state,
      comment: {
        text: state.comment.text,
      },
    }))

    // 评论即时显示
    this.props.dispatch({
      type: 'viewBlog/comment',
      payload: {
        articleId: this.props.match.params.blogId,
        text: this.state.comment.text,
        parseType: '0.0.1',
        hash: 'hash',
      },
      callback: (response) => {
        if (response) {
          setTimeout(() => {
            if (this.state.comments && this.state.comments.content) {
              // 弹出最后一个
              if (this.state.comments.content.length >= this.state.comments.size) {
                this.state.comments.content.pop()
              }
              // 开头插入
              this.state.comments.content.unshift(response)
            }
            this.setState((state) => {
                return {
                  ...state,
                  comment: {},
                  // 评论数加1
                  comments: {
                    page: state.comments.page,
                    size: state.comments.size,
                    content: state.comments.content,
                    totalElements: state.comments.totalElements + 1,
                  },
                  // 评论数加1
                  article: {
                    ...state.article,
                    articleInfo: {
                      ...state.article.articleInfo,
                      comment: state.article.articleInfo.comment + 1,
                    },
                  },
                }
              },
            )
          }, 200)
        }
      },
    })
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
              <h1 style={ {
                textAlign: 'center',
                wordWrap: 'break-word',
              } }>
                <span style={ { fontSize: '18px' } }>{ this.state.article.title }</span></h1>
            </div>

            <div style={ { textAlign: 'center' } }>
              <div className={ styles.extra }>
                <ArticleAuthorInfo
                  author={ this.state.article.author }
                  createAt={ this.state.article.createAt }/>
                <ArticleCommentInfo
                  articleInfo={ this.state.article.articleInfo }/>
              </div>
            </div>

            {
              this.props.loading.effects['viewBlog/articleQuery']
              && (
                <div style={ { textAlign: 'center' } }>
                  <Spin/>
                </div>)
              || (
                <div className="editor-container">
                  <BraftEditor
                    id="BraftEditor-ViewBlog"
                    value={ this.state.text }
                    controls={ [] }
                    readOnly="true"
                  />
                  <ScrollToWhere/>
                </div>)
            }
          </div>
          <hr/>
          <Row style={ {
            backgroundColor: 'white',
            paddingBottom: '20px',
          } } justify="space-around" type="flex">
            <Col xxl={ 16 } xl={ 18 } lg={ 18 } span={ 22 }>
              <Comment
                avatar={
                  <DefaultAvatar/>
                }
                content={
                  <div>
                    <Form.Item>
                      <Input.TextArea
                        rows={ 4 }
                        value={ this.state.comment.text }
                        onChange={ (e) => {
                          // todo, to be known
                          const text = e.target.value
                          this.setState(state => ({
                            ...state,
                            comment: { text },
                          }))
                        } }/>
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType="submit"
                              loading={ this.props.loading.effects['viewBlog/comment'] }
                              onClick={ this.handleComment } type="primary"
                              className="pull-right">
                        Add Comment
                      </Button>
                    </Form.Item>
                  </div>
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
      </Row>
    )
  }
}

export default connect(
  ({
     articleComment
     ,
     loading
     ,
     user,
   },
  ) =>
    ({
      articleComment,
      loading,
      user,
    }),
)
(ViewBlog)
