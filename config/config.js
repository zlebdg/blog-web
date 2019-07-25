import defaultSettings from './defaultSettings' // https://umijs.org/config/
import slash from 'slash2'
import webpackPlugin from './plugin.config'

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
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/user/login',
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user/register',
          name: 'register',
          component: './user/Register',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        {
          path: '/',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: '/aMenu',
          name: 'aMenu',
          icon: 'italic',
          component: './aMenu',
        },
        {
          path: '/aMenu2',
          name: 'aMenu2',
          icon: 'font-colors',
          routes: [
            {
              path: '/aMenu2/sub0',
              name: 'sub menu 0',
              component: './aMenu2/sub0',
            },
            {
              path: '/aMenu2/sub1',
              name: 'sub menu 1',
              component: './aMenu2/sub1',
              icon: 'heat-map', // 也可以带icon
            },
            {
              path: '/aMenu2/sub3',
              name: 'sub menu 3',
              routes: [
                {
                  path: '/aMenu2/sub3/xs0',
                  name: 'xs menu 0',
                  component: './aMenu2/sub3/xs0',
                },
                {
                  path: '/aMenu2/sub3/xs1',
                  name: 'xs menu 1',
                  component: './aMenu2/sub3/xs1',
                },
                {
                  path: '/aMenu2/sub3/xs2',
                  name: 'xs menu 2',
                  component: './aMenu2/sub3/xs2',
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
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
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
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-')
      }

      return localName
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/auth': {
      target: 'http://dev.local:20010/',
      changeOrigin: true,
    },
    '/test': {
      target: 'http://dev.local:20010/',
      changeOrigin: true,
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
  base: '/antd/',
  publicPath: '/antd/',
  outputPath: 'dist/antd/',
  // //
  history: 'hash',
}
