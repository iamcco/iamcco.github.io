import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

import styles from './style'

class Page extends React.PureComponent {
  render () {
    const { children, classes } = this.props

    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h1 className={classes.title}>
            深入浅出 RXJS
          </h1>
          <nav className={classes.nav}>
            <h2>
              年糕小豆汤
            </h2>
            <h3>技术/编码</h3>
            <h3>动漫/游戏</h3>
            <h3>绘画</h3>
            <h3>关于</h3>
          </nav>
        </div>
        <section className={classes.contentCtn}>
          <div className={classes.content}>
            {children}
          </div>
        </section>
        <div className={classes.logo}>
          日常
        </div>
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.element,
  classes: PropTypes.object
}

Page.defaultProps = {
  children: null
}

export default injectSheet(styles)(Page)
