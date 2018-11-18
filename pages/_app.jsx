import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import favicon from '@/assets/favicon.ico'

export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>「日常」</title>
          <link rel='shortcut icon' type='image/ico' href={favicon} />
        </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}
