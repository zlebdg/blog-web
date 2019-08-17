export default {
  // 支持值为 Object 和 Array
  'GET /test/articleComment/list': {
    code: 200,
    message: 'OK',
    data: [
      {
        author: '一楼 作者',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: '沙发沙发',
        replyList: [
          {
            author: '^_^',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: '作者nb,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            replyList: [{
              author: '吃瓜的人',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: '呃呃呃, aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
              replyList: null,
            },
            ],
          },
          {
            author: '游客',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: ',,,,,,,,,,,,',
            replyList: null,
          },
        ],
      },
      {
        author: '2楼 另一个游客',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: '呦呦,',
        replyList: [{
          author: '作者',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: '= = = = = = = = ',
          replyList: [{
            author: '作者',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容,',
            replyList: null,
          },
          ],
        }, {
          author: '大可',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: '11111111111111111111111111,',
          replyList: null,
        },
        ],
      }]
    ,
  },
}
