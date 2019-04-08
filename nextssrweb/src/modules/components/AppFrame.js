import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import Router from 'next/router';
import Interpolate from '@trendmicro/react-interpolate';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import NProgressBar from '@material-ui/docs/NProgressBar';
import MarkdownLinks from 'src/modules/components/MarkdownLinks';
import PageTitle from 'src/modules/components/PageTitle';
import compose from 'src/modules/utils/compose';
import { pathnameToLanguage } from 'src/modules/utils/helpers';

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
  state = {
    // languageMenu: null,
    // mobileOpen: false,
  };

  componentDidMount() {
    const { canonical } = pathnameToLanguage(window.location.pathname);
    this.canonical = canonical;
  }

  render() {
    const { children, classes, reduxTheme, t, userLanguage } = this.props;
    // const { languageMenu } = this.state;

    return (
      <PageTitle t={t}>
        {title => {
          return (
            <div className={classes.root}>
              <NProgressBar />
              <CssBaseline />
              <MarkdownLinks />
              <AppBar className={classes.appBarHome}>
                <Typography className={classes.banner} variant="body2" noWrap>
                  <Interpolate></Interpolate>
                </Typography>
              </AppBar>
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
