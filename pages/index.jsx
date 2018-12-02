import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import Page from '@/components/page'
import styles from './style'
import './index.styl'

class Index extends Component {
  static async getInitialProps (ctx = {}) {
    let { query: { name = '', titles = [], tags = [] } = {} } = ctx

    return {
      titles,
      tags,
      name
    }
  }

  componentDidMount () {
    window.Router = Router
  }

  render () {
    const { classes, name, titles, tags } = this.props
    return (
      <React.Fragment>
        <Head>
          <title>「{name ? `${name}-` : ''}日常」</title>
        </Head>
        <Page
          tags={tags}
        >
          <section className={classes.container}>
            {
              titles.map((title, key) => (
                <section key={key}>
                  <h3>
                    <Link href={`/post/${title}`}>
                      <a>
                        # {title}
                      </a>
                    </Link>
                  </h3>
                </section>
              ))
            }
          </section>
        </Page>
      </React.Fragment>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  titles: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string)
}

export default injectSheet(styles)(Index)
