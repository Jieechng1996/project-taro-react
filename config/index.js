/*
 * @Date: 2022-01-13 17:22:13
 * @Author: guojiecheng
 * @LastEditTime: 2022-01-14 10:20:20
 * @LastEditors: guojiecheng
 */

const outputRootStrtegy = {
  h5: 'dist/h5',
  weapp: 'dist/weapp',
  alipay: 'dist/alipay',
  swan: 'dist/swan',
  jd: 'dist/jd',
  ['undefined']: 'dist'
}

const env = process.env.TARO_ENV

const outputRoot = outputRootStrtegy[env]

const config = {
  projectName: 'projrct-taro-react',
  date: '2022-1-13',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: outputRoot,
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

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
    esnextModules: ['taro-ui'],
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
  if (process.env.NODE_ENV === 'dev') {
    return merge({}, config, require('./dev'))
  }
  if (process.env.NODE_ENV === 'test') {
    return merge({}, config, require('./test'))
  }
  if (process.env.NODE_ENV === 'uat') {
    return merge({}, config, require('./uat'))
  }
  return merge({}, config, require('./prod'))
}
