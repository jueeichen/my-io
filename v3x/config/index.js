const path = require('path') // eslint-disable-line


// 配置vant-ui 引入组件会报错 且根据报错把对应缺失的文件路径填入数组arr
// {
//   from: 'src/components/vant-weapp/wxs',
//   to: 'dist/components/vant-weapp/wxs'
// }

const vant_weapp_config = () => {
  const arr = ['wxs', 'common/style', 'common/index.wxss', 'button', 'icon', 'info', 'loading', 'tabs', 'tab', 'sticky',"cell","cell-group","steps","progress"]
  // const arr = ['vant-weapp/']
  const fromBase = 'src/components/vant-weapp/'
  const toBase = 'dist/components/vant-weapp/'
  let newArr = []
  arr.map(item => {
    newArr.push({ from: fromBase + item, to: toBase + item })
  })
  return newArr
}
// 配置static静态资源文件 可以让一些隐藏的文件夹暴露出来 用于webpack不检测的custom-tab-bar
const static_config = () => {
  const arr = ['tabs/']
  const fromBase = 'src/static/images/'
  const toBase = 'dist/static/images/'
  let newArr = []
  arr.map(item => {
    newArr.push({ from: fromBase + item, to: toBase + item })
  })
  return newArr
}
const config = {
  projectName: 'v3x',
  date: '2021-4-20',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  alias: {
    '@/api': path.resolve(__dirname, '..', 'src/api'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/store': path.resolve(__dirname, '..', 'src/store')
  },
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
      ...vant_weapp_config(), ...static_config()
    ],
    options: {
    }
  },
  framework: 'vue3',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/van-/]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
