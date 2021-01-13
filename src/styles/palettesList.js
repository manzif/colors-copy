import sizes from './sizes';
import bgImage from './img/bg.svg';

export default {
  '@global': {
    '.fade-exit': {
      opacity: 1,
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms ease-out',
    },
  },
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#394bad',
    backgroundImage: `url(${bgImage})`,
    overflow: 'scroll',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',

    [sizes.down('xl')]: {
      width: '80%',
    },

    [sizes.down('xs')]: {
      width: '60%',
    },
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    color: 'white',
    padding: '20px 0',
    alignItems: 'center',
    '& a': {
      color: 'white',
      [sizes.down('xs')]: {
        fontSize: '0.7rem',
      },
    },
    '& h1': {
      fontSize: '2rem',
      [sizes.down('xs')]: {
        fontSize: '0.8rem',
      },
    },
  },
  palettes: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 50%)',
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: '2%',
    },
  },
};
