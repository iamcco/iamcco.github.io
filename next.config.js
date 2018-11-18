// next.config.js
const path = require('path')
const nib = require('nib')
const withStylus = require('@zeit/next-stylus')
const withCSS = require('@zeit/next-css')
const hljs = require('highlight.js')
const mditSub = require('markdown-it-sub')
const mditSup = require('markdown-it-sup')
const mditFootnote = require('markdown-it-footnote')
const mditDeflist = require('markdown-it-deflist')
const mditAbbr = require('markdown-it-abbr')
const mditEmoji = require('markdown-it-emoji')
const mditContainer = require('markdown-it-container')
const mditInsert = require('markdown-it-ins')
const mditMark = require('markdown-it-mark')
const mditKatex = require('markdown-it-katex')
const mditplantuml = require('markdown-it-plantuml')
const mditTasklist = require('markdown-it-task-lists')
const mditMermaid = require('md-it-mermaid')
const mditChart = require('markdown-it-chart').default

const { getPosts } = require('./post')

module.exports = withCSS(withStylus({
  stylusLoaderOptions: {
    use: [nib()]
  },
  pageExtensions: ['jsx'],
  exportPathMap: async function () {
    const postsPath = path.join(__dirname, './posts')
    const res = {
      '/': { page: '/' }
    }
    getPosts(postsPath).forEach((post) => {
      res[`/post/${post.name}`] = { page: '/post', query: { post: post.raw } }
    })
    return res
  },
  webpack (config) {
    const { resolve = {}, module = {} } = config
    return {
      ...config,
      module: {
        ...module,
        rules: [
          ...(module.rules || []),
          {
            test: /\.(png|woff|woff2|eot|ttf|gif|jpg|ico|svg)$/,
            loader: 'file-loader',
            options: {
              name: '[name]@[hash:base64:8].[ext]',
              publicPath: `/_next/static/assets`,
              outputPath: 'static/assets'
            }
          },
          {
            test: /\.md$/,
            loader: 'md-it-loader',
            options: {
              // Enable HTML tags in source
              html: true,
              // Use '/' to close single tags (<br />).
              xhtmlOut: true,
              // This is only for full CommonMark compatibility.
              // Convert '\n' in paragraphs into <br>
              breaks: false,
              // CSS language prefix for fenced blocks. Can be
              // useful for external highlighters.
              langPrefix: 'language-',
              // Autoconvert URL-like text to links
              linkify: true,
              // Enable some language-neutral replacement + quotes beautification
              typographer: true,
              // Double + single quotes replacement pairs, when typographer enabled,
              // and smartquotes on. Could be either a String or an Array.
              //
              // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
              // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
              quotes: '“”‘’',
              // Highlighter function. Should return escaped HTML,
              // or '' if the source string is not changed and should be escaped externally.
              // If result starts with <pre... internal wrapper is skipped.
              highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                  try {
                    return hljs.highlight(lang, str).value
                  } catch (err) { }
                }

                try {
                  return hljs.highlightAuto(str).value
                } catch (err) { }

                return ''
              },
              plugins: [
                mditSub,
                mditSup,
                mditFootnote,
                mditDeflist,
                mditAbbr,
                mditEmoji,
                mditContainer,
                mditInsert,
                mditMark,
                mditKatex,
                mditplantuml,
                mditTasklist,
                mditMermaid,
                mditChart
              ]
            }
          }
        ]
      },
      resolve: {
        ...resolve,
        alias: {
          ...(resolve.alias || {}),
          '@': __dirname
        }
      }
    }
  }
}))
