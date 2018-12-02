export default {
  container: {
    color: '#CCBFB2',

    '& a': {
      color: '#CCBFB2',
      textDecoration: 'none'
    },

    '& h3': {
      padding: 0,
      margin: 0,
      marginBottom: '24px',
      fontSize: '30px',

      '@media screen and (max-width: 600px)': {
        marginbottom: '16px',
        fontSize: '24px'
      }
    }
  }
}
