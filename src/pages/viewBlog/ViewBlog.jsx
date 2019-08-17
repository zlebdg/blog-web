import styles from './index.less'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React from 'react'
import { Base64 } from 'js-base64'
import ArticleComment from './ArticleComment'
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import { Avatar, BackTop, Button, Col, Comment, Form, Icon, Input, List, message, Row } from 'antd'
import { queryArticle } from '../../services/newBlog'
import moment from 'moment'
import { generateImgSrc as idcon } from '../../components/Img/DefaultAvatar'

// 代码高亮插件
BraftEditor.use(CodeHighlighter())

// 本页可解析的文章 parseType 标记
const parseType = 'draft-0.0.1'

// braft-editor 编写提交的文本在展示时有小bug, 需要修改相应 class
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
}

// comment 评论
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <Input.TextArea rows={ 4 } onChange={ onChange }/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={ false } onClick={ onSubmit } type="primary"
              className="pull-right">
        Add Comment
      </Button>
    </Form.Item>
  </div>
)


const ExampleComment = ({ children }) => (
  <Comment
    actions={ [<span key="comment-nested-reply-to">Reply to</span>] }
    author={ <a>Han Solo</a> }
    avatar={
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    }
    content={ `
      resources (Sketch and Axure).
      `
    }
  >
    { children }
  </Comment>
)

const commentList = [{
  author: '作者',
  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  avatarAlt: '作者',
  content: '沙发沙发,',
  replyList: [{
    author: '作者',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    avatarAlt: '作者',
    content: '回复回复,',
    replyList: [{
      author: '作者',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      avatarAlt: '作者',
      content: '呃呃呃,',
      replyList: null,
    },
    ],
  }, {
    author: '游客',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    avatarAlt: '作者',
    content: '二楼,',
    replyList: null,
  },
  ],
}, {
  author: '另一个游客',
  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  avatarAlt: '作者',
  content: '三楼,',
  replyList: [{
    author: '作者',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    avatarAlt: '作者',
    content: '1111,',
    replyList: [{
      author: '作者',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      avatarAlt: '作者',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容,',
      replyList: null,
    },
    ],
  }, {
    author: '大可',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    avatarAlt: '作者',
    content: '..............1111,',
    replyList: null,
  },
  ],
}]

const CommentList = (dataSource) => (
  <List
    dataSource={ dataSource }
    renderItem={ item => (
      <List.Item>
        <Comment
          actions={ [<span key="comment-nested-reply-to">Reply to</span>] }
          author={ item.author }
          avatar={
            <Avatar
              src={ item.avatar }
              alt={ item.avatarAlt }
            />
          }
          content={ item.content }
        >
          { item.children && item.children.map(subItem => (
            <CommentList dataSource={ subItem.dataSource }/>
          )) }
        </Comment>
      </List.Item>
    ) }
  />
)

const NestCommentList = ({ children }) => (
  <List
    dataSource={ commentList }
    renderItem={ item => (
      <List.Item>
        <Comment
          actions={ [<span key="comment-nested-reply-to">Reply to</span>] }
          author={ item.author }
          avatar={
            <Avatar
              src={ item.avatar }
              alt={ item.avatarAlt }
            />
          }
          content={ item.content }
        >
        </Comment>
      </List.Item>
    ) }
  />
)

class ViewBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      author: {
        id: null,
        username: null,
        nickname: null,
        appId: null,
        avatar: null,
      },
      articleInfo: {
        id: null,
        like: null,
        dislike: null,
        star: null,
        comment: null,
        read: null,
      },
      title: null,
      createAt: null,
      blogId: this.props.match.params.blogId,
      editorState: BraftEditor.createEditorState(null),
      commentList: commentList,
    }
  }

  componentDidMount() {
    queryArticle(this.state.blogId)
      .then(resp => {
        console.log(resp)
        if (resp && resp.data) {
          const article = resp.data
          if (article.parseType && parseType === article.parseType) {
            console.log(article)
            this.setState({
              createAt: article.createAt,
              title: article.title,
              author: article.author,
              articleInfo: article.articleInfo,
              editorState: BraftEditor.createEditorState(`${ decodeURIComponent(Base64.decode(article.text)) }`),
            })
          } else {
            message.error(`不能够渲染的文章类型 ${ article.parseType }`)
          }
        }
      })
  }

  // 路由切换/手动改uri, 需要重新加载文章
  componentWillReceiveProps(nextProps, nextContext) {
    const blogIdNew = nextProps.match.params.blogId
    if (blogIdNew !== this.props.match.params.blogId) {
      queryArticle(blogIdNew)
        .then(resp => {
          console.log(resp)
          if (resp && resp.data) {
            const article = resp.data
            if (article.parseType && parseType === article.parseType) {
              this.setState({
                createAt: article.createAt,
                title: article.title,
                author: article.author,
                articleInfo: article.articleInfo,
                editorState: BraftEditor.createEditorState(`${ decodeURIComponent(Base64.decode(article.text)) }`),
              })
            } else {
              message.error(`不能够渲染的文章类型 ${ article.parseType }`)
            }
          }
        })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    fixBraftBug()
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  render() {
    const { editorState } = this.state
    return (
      <Row justify="space-around" type="flex">
        <Col xxl={ 16 } xl={ 18 } lg={ 18 } span={ 24 }>
          <div style={ {
            backgroundColor: 'white',
            padding: '8px',
          } }>

            <div>
              <h1 style={ { textAlign: 'center' } }>
                <span style={ { fontSize: '32px' } }>{ this.state.title }</span></h1>
            </div>

            <div style={ { textAlign: 'center' } }>
              <div className={ styles.extra }>
                <Avatar
                  src={ this.state.author.avatar
                    ? this.state.author.avatar : idcon(this.state.author.username) }
                  alt="alt" size="small"/>
                <a> { this.state.author.username } </a>
                发布于
                {
                  moment(this.state.createAt)
                    .format('YYYY-MM-DD HH:mm:ss')
                }
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={ { margin: '0 0.5em' } }>
                  <Icon type="like-o"/> { this.state.articleInfo.like }
                </span> |
                <span style={ { margin: '0 0.5em' } }>
                  <Icon type="dislike-o"/> { this.state.articleInfo.dislike }
                </span> |
                <span style={ { margin: '0 0.5em' } }>
                  <Icon type="star-o"/> { this.state.articleInfo.star }
                </span> |
                <span style={ { margin: '0 0.5em' } }>
                  <Icon type="message"/> { this.state.articleInfo.comment }
                </span>|
                <span style={ { margin: '0 0.5em' } }>
                  <Icon type="read"/> { this.state.articleInfo.read }
                </span>
              </div>
            </div>

            <BraftEditor
              value={ editorState }
              controls={ [] }
              readOnly="true"
            />
          </div>
          <hr/>
          <div style={ {
            backgroundColor: 'white',
            padding: '10px 40px',
          } }>
            <Comment
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={
                <Editor value=""/>
              }
            />


            <ArticleComment commentList={ commentList }/>

            {/*<CommentList dataSource={ commentList }/>*/ }

            <ExampleComment>
              <ExampleComment>
                <ExampleComment/>
                <ExampleComment/>
              </ExampleComment>
            </ExampleComment>
          </div>
        </Col>
        <BackTop/>
      </Row>
    )
  }
}

export default ViewBlog
