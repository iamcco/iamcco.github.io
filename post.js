const fs = require('fs')
const path = require('path')
const MarkdownIt = require('markdown-it')
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

const mdExtend = /.md$/

function getRender (options = {}, plugins = []) {
  const mdRender = new MarkdownIt({
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
    ...options
  });
  [
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
  ].concat(plugins).forEach(plugin => {
    mdRender.use(plugin)
  })
  return mdRender
}

exports.getPosts = function getPosts (dir, options, plugins) {
  const mdRender = getRender(options, plugins)
  const posts = []
  let list = [dir]
  while (list.length) {
    const p = list.pop()
    const state = fs.statSync(p)
    if (state.isDirectory()) {
      list = list.concat(fs.readdirSync(p).map(sub => path.join(p, sub)))
    } else if (state.isFile() && mdExtend.test(p)) {
      posts.push({
        name: path.basename(p).replace(mdExtend, ''),
        raw: mdRender.render(fs.readFileSync(p, 'utf-8'))
      })
    }
  }
  return posts
}
