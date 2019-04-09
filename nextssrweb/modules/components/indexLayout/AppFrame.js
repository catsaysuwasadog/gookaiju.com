import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import Router from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NProgressBar from 'modules/components/basecomponents/NProgressBar';
import PageTitle from 'modules/components/basecomponents/PageTitle';
import compose from 'modules/utils/compose';
import { pathnameToLanguage } from 'modules/utils/helpers';
import Head from 'modules/components/Head';
import Footer from 'modules/components/indexLayout/Footer';

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
  homeroot: {
    flex: '1 0 100%',
  },
  headbanner: {
    display: 'block',
    padding: theme.spacing(0.5),
    textAlign: 'center',
    backgroundColor: '#311b92',
    color: 'white',
    width: '100%',
    position: 'fixed',
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

    return (
      <PageTitle t={t}>
        {title => {
          // eslint-disable-next-line no-console
          console.log(`IndexHome + AppFrame + PageTitle ${title}......`);

          return (
            <div className={classes.root}>
              <NProgressBar />
              <CssBaseline />
              <div className={classes.homeroot}>
                <Head />
                <div className={classes.headbanner}></div>
                {children}
                <Footer />
              </div>
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
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({
    reduxTheme: state.theme,
    t: state.options.t,
    userLanguage: state.options.userLanguage,
  })),
  withStyles(styles),
)(AppFrame);
