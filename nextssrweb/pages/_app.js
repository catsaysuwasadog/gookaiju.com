import 'src/modules/components/bootstrap';
import React from 'react';
import App, { Container } from 'next/app';
import find from 'lodash/find';
import { Provider as ReduxProvider } from 'react-redux';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import AppWrapper from 'src/modules/components/AppWrapper';
import PageContext from 'src/modules/components/PageContext';
import initRedux from 'src/modules/redux/initRedux';
import pages from 'src/pages';

const USE_STRICT_MODE = false;
const ReactMode = USE_STRICT_MODE ? React.StrictMode : React.Fragment;

let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }
  dependenciesLoaded = true;
  loadCSS('https://fonts.googleapis.com/icon?family=Material+Icons', document.querySelector('#gookaiju-icon-font'));
}

if (process.browser) {
  // eslint-disable-next-line no-console
  console.log('welcome gookaiju.com web page......');
}

function findActivePage(currentPages, router) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return router.pathname.indexOf(`${page.pathname}/`) === 0;
    }
    return router.pathname === page.pathname;
  });
  if (!activePage) {
    return null;
  }
  if (activePage.pathname !== router.pathname) {
    return findActivePage(activePage.children, router);
  }

  return activePage;
}

class GookaijuApp extends App {
  constructor(props) {
    super();
    this.redux = initRedux(props.pageProps.reduxServerState);
  }

  componentDidMount() {
    loadDependencies();
  }

  render() {
    const { Component, pageProps, router } = this.props;

    let pathname = router.pathname;
    if (pathname !== '/') {
      pathname = pathname.replace(/\/$/, '');
    }

    const activePage = findActivePage(pages, { ...router, pathname });

    return (
      <ReactMode>
        <Container>
          <ReduxProvider store={this.redux}>
            <PageContext.Provider value={{ activePage, pages }}>
              <AppWrapper>
                <Component {...pageProps} />
              </AppWrapper>
            </PageContext.Provider>
          </ReduxProvider>
        </Container>
      </ReactMode>
    );
  }
}

GookaijuApp.getInitialProps = ({ ctx }) => {
  let pageProps = {};

  if (!process.browser) {
    const redux = initRedux({
      options: {
        userLanguage: ctx.query.userLanguage,
      },
    });
    pageProps = {
      reduxServerState: redux.getState(),
    };
  }

  return {
    pageProps,
  };
};

export default GookaijuApp;
