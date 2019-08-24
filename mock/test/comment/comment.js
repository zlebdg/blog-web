export default {
  // 支持值为 Object 和 Array
  'GET /public/articleComment/list': {
    code: 200,
    message: 'OK',
    data: {
      page: 1,
      pageSize: 10,
      list: [
        {
          author: '一楼 作者',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          text: '沙发沙发',
          replys: {
            list: [
              {
                author: '^_^',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                text: '作者nb,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                replys: {
                  list: [
                    {
                      author: '吃瓜的人',
                      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                      text: '呃呃呃, aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                      replys: null,
                    },
                  ],
                },
              },
              {
                author: '游客',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                text: ',,,,,,,,,,,,',
                replys: null,
              },
            ],
          },
        },
        {
          author: '2楼 另一个游客',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          text: '呦呦,',
          replys: {
            list: [
              {
                author: '作者',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                text: '= = = = = = = = ',
                replys: {
                  list: [
                    {
                      author: '作者',
                      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                      text: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容,',
                      replys: null,
                    },
                  ],
                },
              },
              {
                author: '大可',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                text: '11111111111111111111111111,',
                replys: null,
              },
            ],
          },
        }],
    },
  },
}
