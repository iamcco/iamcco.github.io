import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Router from 'next/router'

import Page from '@/components/page'
import styles from './style'
import './index.styl'

class Index extends Component {
  static async getInitialProps (ctx = {}) {
    let { query: { titles = [], tags = [] } = {} } = ctx

    return {
      titles,
      tags
    }
  }

  componentDidMount () {
    window.Router = Router
  }

  render () {
    const { classes, titles, tags } = this.props
    return (
      <Page
        tags={tags}
      >
        <section className={classes.container}>
          {
            titles.map(title => (
              <section>
                <h3
                  onClick={() => Router.push(`/post/${title}`)}
                >
                  # {title}
                </h3>
              </section>
            ))
          }
        </section>
      </Page>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object,
  titles: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string)
}

export default injectSheet(styles)(Index)
