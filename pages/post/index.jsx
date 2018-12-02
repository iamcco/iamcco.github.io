import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Page from '@/components/page'

import Markdown from '@/components/markdown'

class Post extends React.PureComponent {
  static async getInitialProps (ctx = {}) {
    let {
      query: {
        post = '',
        name = '',
        tags = []
      } = {}
    } = ctx

    if (process.env.NODE_ENV !== 'production') {
      post = require(`@/posts/${post}.md`)
    }

    return {
      post,
      name,
      tags
    }
  }

  render () {
    const { post, name, tags } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>「{name}-日常」</title>
        </Head>
        <Page
          name={name}
          tags={tags}
        >
          <Markdown
            post={post}
          />
        </Page>
      </React.Fragment>
    )
  }
}

Post.propTypes = {
  post: PropTypes.string,
  name: PropTypes.string,
  tags: PropTypes.array
}

Post.defaultProps = {
  post: '',
  name: '',
  tags: []
}

export default Post
