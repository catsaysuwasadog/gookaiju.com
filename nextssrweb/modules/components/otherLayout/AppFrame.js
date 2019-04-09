import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import Router from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NProgressBar from '@material-ui/docs/NProgressBar';
import PageTitle from 'modules/components/basecomponents/PageTitle';
import compose from 'modules/utils/compose';
import { pathnameToLanguage } from 'modules/utils/helpers';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

export const languages = [
  {
    code: 'en',
    text: '🇺🇸 English',
  },
  {
    code: 'zh',
    text: '🇨🇳 中文',
  },
];

const styles = theme => ({
  root: {
    display: 'flex',
  },
  banner: {
    display: 'block',
    padding: 4,
    textAlign: 'center',
    backgroundColor: '#311b92',
    color: 'white',
  },
  topbanner: {
    display: 'block',
    padding: 4,
    textAlign: 'center',
    backgroundColor: '#311b92',
    color: 'white',
    width: '100%',
    position: 'fixed',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: '0 1 auto',
  },
  appBar: {
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute',
    },
  },
  appBarHome: {
    boxShadow: 'none',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      width: 240,
    },
  },
});

class AppFrame extends React.Component {
  state = {};

  componentDidMount() {
    const { canonical } = pathnameToLanguage(window.location.pathname);
    this.canonical = canonical;
  }

  render() {
    const { children, classes, t } = this.props;
    // const { languageMenu } = this.state;

    return (
      <PageTitle t={t}>
        {title => {
          return (
            <div className={classes.root}>
              <NProgressBar />
              <CssBaseline />
              <div className={classes.topbanner}></div>
              {children}
            </div>
          );
        }}
      </PageTitle>
    );
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  reduxTheme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  userLanguage: PropTypes.string.isRequired,
};

export default compose(
  connect(state => ({
    reduxTheme: state.theme,
    t: state.options.t,
    userLanguage: state.options.userLanguage,
  })),
  withStyles(styles),
)(AppFrame);
