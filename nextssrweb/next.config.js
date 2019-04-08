const webpack = require('webpack');
const withTM = require('next-plugin-transpile-modules');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const withTypescript = require('@zeit/next-typescript');
const pkg = require('./package.json');
const { findPages } = require('src/modules/utils/find');

const LANGUAGES = ['en', 'zh'];

module.exports = withTypescript({
  webpack: (config, options) => {
    config = withTM({
      transpileModules: ['notistack', 'material-ui-pickers'],
    }).webpack(config, options);

    const plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          LIB_VERSION: JSON.stringify(pkg.version),
        },
      }),
    ]);

    if (process.env.STATS_ENABLED) {
      plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          generateStatsFile: true,
          statsFilename: 'stats.json',
        }),
      );
    }

    return Object.assign({}, config, {
      plugins,
      node: {
        fs: 'empty',
      },
      module: Object.assign({}, config.module, {
        rules: config.module.rules.concat([
          {
            test: /\.(css|md)$/,
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]',
            },
          },
          {
            test: /\.(css|md)$/,
            loader: 'raw-loader',
          },
        ]),
      }),
    });
  },
  webpackDevMiddleware: config => config,
  // Next.js provides a `defaultPathMap` argument, we could simplify the logic.
  // However, we don't in order to prevent any regression in the `findPages()` method.
  exportPathMap: () => {
    const pages = findPages();
    const map = {};

    function traverse(pages2, userLanguage) {
      const prefix = userLanguage === 'en' ? '' : `/${userLanguage}`;

      pages2.forEach(page => {
        if (!page.children) {
          map[`${prefix}${page.pathname}`] = {
            page: page.pathname,
            query: {
              userLanguage,
            },
          };
          return;
        }

        traverse(page.children, userLanguage);
      });
    }
    // We want to speed-up the build of pull requests.
    if (process.env.PULL_REQUEST === 'true') {
      traverse(pages, 'en');
    } else {
      LANGUAGES.forEach(userLanguage => {
        traverse(pages, userLanguage);
      });
    }

    return map;
  },
  onDemandEntries: {
    // 服务器将页面保留在缓冲区（以毫秒为单位）
    maxInactiveAge: 120 * 1e3, // default 25s
    // 同时保留而不被丢弃的页数
    pagesBufferLength: 3, // default 2
  },
});
