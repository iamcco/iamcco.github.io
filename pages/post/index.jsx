import React from 'react'
import PropTypes from 'prop-types'

import Markdown from '@/components/markdown'

class Post extends React.PureComponent {
  static async getInitialProps (ctx = {}) {
    let { query: { post = '' } = {} } = ctx

    if (process.env.NODE_ENV !== 'production') {
      post = require(`@/posts/${post}.md`)
    }

    return {
      post
    }
  }

  render () {
    const { post } = this.props

    return (
      <Markdown
        post={post}
      />
    )
  }
}

Post.propTypes = {
  post: PropTypes.string
}

Post.defaultProps = {
  post: ''
}

export default Post
