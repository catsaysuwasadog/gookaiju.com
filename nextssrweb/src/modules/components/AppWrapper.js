import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StylesProvider,
  ThemeProvider,
  jssPreset,
  createGenerateClassName,
} from '@material-ui/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { ACTION_TYPES } from 'src/modules/constants';
import { lightTheme, darkTheme, setPrismTheme } from 'src/modules/components/prism';
import getTheme from 'src/modules/styles/getTheme';
import { getCookie } from 'src/modules/utils/helpers';

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
  insertionPoint: process.browser ? document.querySelector('#insertion-point-jss') : null,
});

const generateClassName = createGenerateClassName();

function themeSideEffect(reduxTheme) {
  setPrismTheme(reduxTheme.paletteType === 'light' ? lightTheme : darkTheme);
  document.body.dir = reduxTheme.direction;
}

class SideEffectsRaw extends React.Component {
  componentDidMount() {
    // const { options } = this.props;
  }

  render() {
    return null;
  }
}

SideEffectsRaw.propTypes = {
  dispatch: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
};

const SideEffects = connect(state => ({
  options: state.options,
}))(SideEffectsRaw);

// Inspired by https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
function forcePageReload(registration) {
  if (!navigator.serviceWorker.controller) {
    return;
  }
  if (registration.waiting) {
    registration.waiting.postMessage('skipWaiting');
    return;
  }

  function listenInstalledStateChange() {
    registration.installing.addEventListener('statechange', event => {
      if (event.target.state === 'installed' && registration.waiting) {
        registration.waiting.postMessage('skipWaiting');
      } else if (event.target.state === 'activated') {
        window.location.reload();
      }
    });
  }

  if (registration.installing) {
    listenInstalledStateChange();
    return;
  }

  registration.addEventListener('updatefound', listenInstalledStateChange);
}

async function registerServiceWorker() {
  if (
    'serviceWorker' in navigator &&
    process.env.NODE_ENV === 'production' &&
    window.location.host.indexOf('gookaiju.com') <= 0
  ) {
    const registration = await navigator.serviceWorker.register('/serviceworker.js');
    forcePageReload(registration);
  }
}

class AppWrapper extends React.Component {
  state = {};

  componentDidMount() {
    themeSideEffect(this.props.reduxTheme);
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    const { reduxTheme } = this.props;
    const paletteType = getCookie('paletteType');
    const paletteColors = getCookie('paletteColors');

    if (
      (paletteType && reduxTheme.paletteType !== paletteType) ||
      (paletteColors && JSON.stringify(reduxTheme.paletteColors) !== paletteColors)
    ) {
      this.props.dispatch({
        type: ACTION_TYPES.THEME_CHANGE,
        payload: {
          paletteType,
          paletteColors: paletteColors ? JSON.parse(paletteColors) : null,
        },
      });
    }

    registerServiceWorker();
  }

  componentDidUpdate() {
    themeSideEffect(this.props.reduxTheme);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.theme === 'undefined') {
      return {
        prevProps: nextProps,
        theme: getTheme(nextProps.reduxTheme),
      };
    }

    const { prevProps } = prevState;

    if (
      nextProps.reduxTheme.paletteType !== prevProps.reduxTheme.paletteType ||
      nextProps.reduxTheme.paletteColors !== prevProps.reduxTheme.paletteColors ||
      nextProps.reduxTheme.direction !== prevProps.reduxTheme.direction
    ) {
      return {
        prevProps: nextProps,
        theme: getTheme(nextProps.reduxTheme),
      };
    }

    return null;
  }

  render() {
    const { children } = this.props;
    const { theme } = this.state;

    return (
      <StylesProvider generateClassName={generateClassName} jss={jss}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <SideEffects />
      </StylesProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  reduxTheme: PropTypes.object.isRequired,
};

export default connect(state => ({
  reduxTheme: state.theme,
}))(AppWrapper);
