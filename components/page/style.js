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
    color: mainText,

    '@media screen and (max-width: 600px)': {
      left: '8px',
      bottom: '16px',
      fontSize: '28px'
    }
  },

  nav: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    textAlign: 'right',
    color: mainText,

    '@media screen and (max-width: 600px)': {
      top: '16px',
      right: '8px'
    },

    '& h2, h3': {
      padding: 0,
      margin: 0,
      marginbottom: '16px'
    },

    '& h2': {
      fontSize: '30px',

      '@media screen and (max-width: 600px)': {
        fontSize: '24px'
      }
    },

    '& h3': {
      marginTop: '10px',
      fontSize: '22px',

      '@media screen and (max-width: 600px)': {
        marginTop: '5px',
        fontSize: '18px'
      }
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

    '@media screen and (max-width: 600px)': {
      display: 'none'
    },

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
    marginTop: '36vh',
    overflowY: 'scroll',
    boxSizing: 'border-box',
    backgroundColor: mainDark
  },

  content: {
    boxSizing: 'border-box',
    borderTop: '1px transparent solid',
    minHeight: '60vh',
    padding: 24,

    '@media screen and (max-width: 600px)': {
      padding: 8,
      paddintTop: 24
    }
  },

  footer: {
    height: '4vh',
    textAlign: 'center',
    lineHeight: '4vh',
    color: '#504c48',

    '& a': {
      transition: 'all 2s',
      color: '#504c48',
      textDecoration: 'none'
    },

    '& a:hover': {
      color: mainWhite
    }
  }
}
