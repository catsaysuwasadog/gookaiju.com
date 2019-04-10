/* eslint-disable no-underscore-dangle */
import React from 'react';
import { ServerStyleSheets } from '@material-ui/styles';
import Document, { Head, Main, NextScript } from 'next/document';
import { Router } from 'next/router';
import { pathnameToLanguage } from 'modules/utils/helpers';
import getTheme from 'modules/styles/getTheme';
import themeInitialState from 'modules/styles/themeInitialState';

const theme = getTheme(themeInitialState);
let prefixer;
let cleanCSS;
if (process.env.NODE_ENV === 'production') {
  /* eslint-disable global-require */
  const postcss = require('postcss');
  const autoprefixer = require('autoprefixer');
  const CleanCSS = require('clean-css');
  /* eslint-enable global-require */
  prefixer = postcss([autoprefixer]);
  cleanCSS = new CleanCSS();
}

class GookaijuDocument extends Document {
  render() {
    const { canonical, userLanguage } = this.props;
    return (
      <html lang={userLanguage}>
        <Head>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="canonical" href={`https://gookaiju.com${Router._rewriteUrlForNextExport(`${userLanguage === 'zh' ? '' : `/${userLanguage}`}${canonical}`)}`} />
          <link rel="stylesheet" href={'https://fonts.googleapis.com/css?family=Roboto:300,400,500'} />
          <style id="insertion-point-jss" />
          <style id="gookaiju-icon-font" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

GookaijuDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  let css = sheets.toString();
  if (css && process.env.NODE_ENV === 'production') {
    const result1 = await prefixer.process(css, { from: undefined });
    css = result1.css;
    css = cleanCSS.minify(css).styles;
  }

  return {
    ...initialProps,
    url: ctx.req.url,
    canonical: pathnameToLanguage(ctx.req.url).canonical,
    userLanguage: ctx.query.userLanguage,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: css }}
      />
    ),
  };
};

export default GookaijuDocument;
