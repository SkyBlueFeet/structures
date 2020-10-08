import BabelPlugin from '@rollup/plugin-babel'
import NodeResolve from '@rollup/plugin-node-resolve'
import CommonJS from '@rollup/plugin-commonjs'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import filesize from 'rollup-plugin-filesize'
import { eslint } from 'rollup-plugin-eslint'
import { RollupOptions, OutputOptions, ModuleFormat } from 'rollup'

import Typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

import path from 'path'
import {
  name as $name,
  version as $version,
  author as $author
} from '../package.json'

import license from 'rollup-plugin-license'
const cwd = process.cwd()

const $entry: string | string[] = 'bin/index.ts'
const $outDir = 'dist'
const $useEslint = true
const $eslintFeild = ['.js', '.jsx', '.tsx', '.ts', '.vue']
const $extensions = ['.vue', 'js', '.ts', '.tsx', '.jsx', '.json']
const $babelTransformFeild = ['.ts', '.tsx', '.vue', ...DEFAULT_EXTENSIONS]

const $format: ModuleFormat[] = ['cjs', 'iife', 'esm']

const $preSetExternal = {
  // vue: 'vue',
  // 'vue-tsx-support': 'vue-tsx-support',
  // 'vue-property-decorator': 'vue-property-decorator',
}

function toPascalCase(text: string): string {
  const textList = text.split('') // 把字符串转换成数组
  for (let i = 0; i < textList.length; i++) {
    // 遍历数组
    if (textList[i] === '-') {
      // 寻找'-'分隔符
      textList.splice(i, 1) // 删除这个分隔符，如果找到 就删除它
      textList[i] = textList[i].toUpperCase() // 删除 - 分隔符以后 后面的元素 前移  则直接修改为大写
    }
  }
  // console.log(textList);
  const str = textList.join() // 用join方法把 数组 转成 字符串
  const strHump = str.replace(/,/g, '') // 利用正则表达式查找所有的 , 并且修改为空字符串
  return strHump // 返回驼峰命名字符串
}

const rollupConfig: RollupOptions = {
  input: $entry,
  output: $format.map<OutputOptions>(format => ({
    name: toPascalCase($name),
    file: `${$outDir}/${$name}.${format}.min.js`,
    format,
    banner:
      `${'/*!\n' + ' * '} ${$name}.${format}.js v${$version}\n` +
      ` * (c) 2019-${new Date().getFullYear()} ${$author}\n` +
      ` * Released under the MIT License.\n` +
      ` */`
  })),
  inlineDynamicImports: true,
  plugins: [
    Typescript(),
    // 载入CommonJS模块

    NodeResolve({
      extensions: $extensions
    }),
    CommonJS(),
    // VuePlugin({
    //   normalizer: '~vue-runtime-helpers/dist/normalize-component.js',
    //   css: false,
    // }),
    terser({
      include: [/^.+\.min\.js$/],
      exclude: ['some*'],
      ecma: 5,
      keep_classnames: true,
      keep_fnames: true,
      output: {
        comments: true
      }
    }),
    BabelPlugin({
      babelHelpers: 'runtime',
      extensions: $babelTransformFeild
    }),
    filesize(),
    license({
      banner: {
        commentStyle: 'ignored',

        content: {
          file: path.resolve(cwd, 'LICENSE'),
          encoding: 'utf-8' // Default is utf-8
        }
      }
    })
  ],
  external: Object.keys($preSetExternal)
}

if ($useEslint) {
  rollupConfig.plugins.push(
    eslint({
      fix: true,
      include: $eslintFeild.map(ext => new RegExp(`/\\${ext}$/`))
    })
  )
}

export default rollupConfig
