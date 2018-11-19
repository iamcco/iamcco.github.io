import React from 'react'
import PropTypes from 'prop-types'

import './style.styl'

class Page extends React.PureComponent {
  render () {
    const { children } = this.props

    return (
      <div className='container'>
        <div className='white'>
          <h1 className='title'>
            深入浅出 RXJS
          </h1>
          <nav className='nav'>
            <h2>
              年糕小豆汤
            </h2>
            <h3>技术/编码</h3>
            <h3>动漫/游戏</h3>
            <h3>绘画</h3>
            <h3>关于</h3>
          </nav>
        </div>
        <div className='logo'>
          日常
        </div>
        <section className='content-ctn'>
          <div className='content'>
            {children}
          </div>
        </section>
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.element
}

Page.defaultProps = {
  children: null
}

export default Page
