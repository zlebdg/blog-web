import defaultSettings from './defaultSettings' // https://umijs.org/config/
import slash           from 'slash2'
import webpackPlugin   from './plugin.config'

const { pwa, primaryColor } = defaultSettings // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site'
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
] // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ])
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ])
}

export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    // oauth 登录
    {
      path: '/oauth',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/oauth/callbackPage',
          component: './oauth/CallbackPage',
        },
      ],
    },
    // 登录后首页
    {
      path: '/home',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/home',
          component: './aMenu',
        },
      ],
    },
    // 不需要登录的
    {
      path: '/public',
      routes: [
        {
          path: '/public/viewBlog',
          component: '../layouts/BasicLayout',
          routes: [
            {
              name: 'Blog List',
              icon: 'unordered-list',
              path: '/public/blogList',
            },
            {
              path: '/public/viewBlog/blogId/:blogId',
              component: './viewBlog/ViewBlog',
            },
            {
              path: '/public/viewBlog/testMockArticleComments/blogId/:blogId',
              component: './viewBlog/ViewBlogTestMockArticleComments',
            },
            {
              path: '/public/viewBlog/test',
              component: './viewBlog/ViewBlogTest',
            },
            {
              path: '/public/viewBlog/testEmoji',
              component: './viewBlog/ViewBlogEmojiTest',
            },
            {
              path: '/public/viewBlog/testInfo',
              component: './viewBlog/ViewBlogArticleInfoTest',
            },
            {
              path: '/public/viewBlog/testBase64',
              component: './viewBlog/ViewBlogBase64Test',
            },
          ],
        },
        {
          path: '/public/blogList',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/public/blogList',
              component: './blog-list',
            },
          ],
        },
      ],
    },
    // 测试
    {
      path: '/test',
      routes: [
        {
          path: '/test',
          redirect: '/test/dva/emoji',
        },
        {
          path: '/test/dva',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/test/dva/emoji',
              component: './test/dva/emoji',
            },
            {
              path: '/test/dva/dva01',
              component: './test/dva/dva01',
            },
            {
              path: '/test/dva/dva02',
              component: './test/dva/dva02',
            },
            {
              path: '/test/dva/dva03',
              component: './test/dva/dva03',
            },
            {
              name: 'dva menu',
              path: '/test/dva/menu',
              component: './test/dva/menu',
            },
          ],
        },
      ],
    },
    {
      path: '/',
      hideInMenu: true,
      routes: [
        // 根路由重定向
        {
          path: '/',
          redirect: '/public/blogList',
        },
        {
          path: '/:username',
          routes: [
            {
              path: '/:username',
              redirect: '/:username/index',
            },
            {
              path: '/:username/index',
              component: '../layouts/BasicLayout',
              routes: [
                {
                  path: '/:username/index',
                  component: './first/index',
                  routes: [
                    {
                      path: '/:usernaem/index',
                      component: './block/search-list-articles',
                    },
                  ],
                },
              ],
            },
            {
              path: '/:username/editor',
              component: './markdown/Editor',
            },
            {
              path: '/:username/editor2',
              component: './markdown/Editor2',
            },
            {
              path: '/:username/editor3',
              component: './markdown/Editor3',
            },
            {
              path: '/:username/editor4',
              component: './markdown/Editor4',
            },
            {
              path: '/:username/editor5',
              component: './markdown/Editor5',
            },
            {
              path: '/:username/newBlog',
              component: '../layouts/BasicLayout',
              routes: [
                {
                  path: '/:username/newBlog',
                  component: './newBlog/NewBlog',
                },
              ],
            },
            {
              path: '/:username/viewBlog',
              component: '../layouts/BasicLayout',
              routes: [
                // 查看文章, 带 :username
                {
                  path: '/:username/viewBlog/blogId/:blogId',
                  component: './viewBlog/ViewBlog',
                },
              ],
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  // theme: {
  // 'primary-color': primaryColor,
  // },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName
      }

      const match = context.resourcePath.match(/src(.*)/)

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '')
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase())
        return `antd-pro${ arr.join('-') }-${ localName }`.replace(/--/g, '-')
      }

      return localName
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/login': {
      target: 'http://blog.local:20000/',
      changeOrigin: false,
    },
    '/auth/**': {
      target: 'http://blog.local:20000/',
      changeOrigin: false,
    },
    '/test**/**': {
      target: 'http://blog.local:20000/',
      changeOrigin: false,
    },
    '/public**/**': {
      target: 'http://blog.local:20000/',
      changeOrigin: false,
    },
    '/article': {
      target: 'http://blog.local:20000/',
      changeOrigin: false,
    },
  },
  // 如果项目要发布到非根目录下
  // 以下 (base/publicPath/outputPath) 几个参数如何配置
  // 是与反向代理嗠器nginx配置相关的
  // 方式一
  // nginx:
  // location /antd/ {
  //   proxy_pass http://dev.local:5000/;
  // }
  // umi:
  // base: '/antd/',
  // publicPath: '/antd/',
  // //
  // 方式二
  // nginx:
  // location /antd/ {
  //   proxy_pass http://dev.local:5000/antd/;
  // }
  // umi:
  base: '/blog/',
  // cdn 用的
  publicPath: 'http://px7bethft.bkt.clouddn.com/blog/',
  outputPath: 'dist/blog/',
  // //
  history: 'hash',
}
