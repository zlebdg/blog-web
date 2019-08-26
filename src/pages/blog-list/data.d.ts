export interface BlogListItem {
  articleInfo: {
    comment: number // 评论数
    createAt: number // 创建时间
    dislike: number // 反对数
    id: number
    isDeleted: boolean
    like: number // 赞同数
    read: number // 阅读数
    star: number
    trans: number // 转发数
    version: number
  },
  author: {
    appId: string
    createAt: number
    id: string // 作者id
    isDeleted: boolean
    nickname: string // 作者名
    updateAt: number
    username: string // 作者名
    version: number
  }
  createAt: number
  hash: string
  id: number
  parseType: string
  preview: string
  title: string
  updateAt: number
}
