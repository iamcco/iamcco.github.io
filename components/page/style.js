const mainDark = '#333333'
const mainWhite = '#CCBFB2'
const mainText = mainDark

export default {
  container: {
    width: '100vw',
    height: '100vh'
  },

  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '36vh',
    backgroundColor: mainWhite
  },

  title: {
    position: 'absolute',
    left: '24px',
    bottom: '24px',
    margin: 0,
    padding: 0,
    fontSize: '36px',
    color: mainText
  },

  nav: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    textAlign: 'right',
    color: mainText,

    '& h2, h3': {
      padding: 0,
      margin: 0,
      marginbottom: '16px'
    },

    '& h2': {
      fontSize: '30px'
    },

    '& h3': {
      marginTop: '10px',
      fontSize: '22px'
    },

    '& a': {
      color: mainText,
      textDecoration: 'none'
    }
  },

  logo: {
    position: 'fixed',
    right: '16px',
    bottom: '16px',
    fontSize: '60px',
    writingMode: 'tb',
    letterSpacing: '10px',
    color: mainWhite,

    '& a': {
      color: mainWhite,
      textDecoration: 'none'
    }
  },

  contentCtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100vw',
    borderTop: '1px transparent solid',
    marginTop: '36vh',
    overflowY: 'scroll',
    boxSizing: 'border-box',
    backgroundColor: mainDark
  },

  content: {
    margin: 24
  }
}
