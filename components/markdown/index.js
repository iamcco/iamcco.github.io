import React from 'react'
import PropTypes from 'prop-types'
import './style.styl'

class Markdown extends React.PureComponent {
  render () {
    const { post } = this.props
    return (
      <section className='markdown-body'>
        {post}
      </section>
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
