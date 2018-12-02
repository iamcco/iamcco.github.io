import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

import styles from './style'

class Page extends React.PureComponent {
  render () {
    const {
      children,
      classes,
      name,
      tags
    } = this.props

    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h1 className={classes.title}>
            {name || '电助！凉子，看到了吗！'}
          </h1>
          <nav className={classes.nav}>
            <a href='/'>
              <h2>
                  年糕小豆汤
              </h2>
            </a>
            {
              tags.map(tag => (
                <h3 key={tag}>
                  <a href={`/tag/${tag}`}>
                    {tag}
                  </a>
                </h3>
              ))
            }
          </nav>
        </div>
        <section className={classes.contentCtn}>
          <div className={classes.content}>
            {children}
          </div>
          <div className={classes.footer}>
            <a href='http://www.miibeian.gov.cn'>
                京ICP备15050638号-1
            </a> & <a href='/'>{new Date().getFullYear()} @ 年糕小豆汤</a>

          </div>
        </section>
        <div className={classes.logo}>
          <a href='/'>
            日常
          </a>
        </div>
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.element,
  classes: PropTypes.object,
  name: PropTypes.string,
  tags: PropTypes.array
}

Page.defaultProps = {
  children: null
}

export default injectSheet(styles)(Page)
