import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'
import 'highlight.js/styles/github.css'

import './style.styl'
import './katex@0.5.1.css'

class Markdown extends React.PureComponent {
  componentDidMount () {
    try {
      const Mermaid = require('mermaid')
      Mermaid.init(null, document.querySelectorAll('.mermaid'))
    } catch (e) {
      console.log('[mermaid]: ', e)
    }
    try {
      document.querySelectorAll('.chartjs').forEach(element => {
        try {
          // eslint-disable-next-line no-new
          new Chart(element, JSON.parse(element.textContent))
        } catch (e) {
          element.outerHTML = `<pre>Chart.js complains: "${e}"</pre>`
        }
      })
    } catch (e) {
      console.log('[chart.js]: ', e)
    }
  }

  render () {
    const { post } = this.props
    return (
      <section
        className='markdown-body'
        dangerouslySetInnerHTML={{
          __html: post
        }}
      />
    )
  }
}

Markdown.propTypes = {
  post: PropTypes.string
}

Markdown.defaultProps = {
  post: ''
}

export default Markdown
