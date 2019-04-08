const bpmr = require('babel-plugin-module-resolver');

function resolvePath(sourcePath, currentFile, opts) {
  if (sourcePath === 'markdown') {
    const base = currentFile.substring(__dirname.length).slice(0, -3);
    return `${__dirname}/src/${base}/`;
  }
  return bpmr.resolvePath(sourcePath, currentFile, opts);
}

let defaultPresets;

if (process.env.BABEL_ENV === 'es') {
  defaultPresets = [];
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: ['esm', 'production-umd'].includes(process.env.BABEL_ENV) ? false : 'commonjs',
      },
    ],
  ];
}

const defaultAlias = {};
const productionPlugins = [
  'babel-plugin-transform-react-constant-elements',
  'babel-plugin-transform-dev-warning',
  ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap',
    },
  ],
];

module.exports = {
  presets: defaultPresets.concat(['@babel/preset-react']),
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-runtime',
  ],
  ignore: [/@babel[\\|/]runtime/],
  env: {
    'nextssrweb-development': {
      presets: ['@zeit/next-typescript/babel'],
      plugins: [
        'babel-plugin-preval',
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              ...defaultAlias,
              src: './src',
              modules: './modules',
              pages: './pages',
              translations: './translations',
            },
            transformFunctions: ['require', 'require.context'],
            resolvePath,
          },
        ],
      ],
    },
    'nextssrweb-production': {
      presets: ['next/babel', '@zeit/next-typescript/babel'],
      plugins: [
        'babel-plugin-preval',
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              ...defaultAlias,
              src: './src',
              modules: './modules',
              pages: './pages',
              translations: './translations',
            },
            transformFunctions: ['require', 'require.context'],
            resolvePath,
          },
        ],
        'babel-plugin-transform-react-constant-elements',
        'babel-plugin-transform-dev-warning',
        ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
        ['babel-plugin-transform-react-remove-prop-types', { mode: 'remove' }],
      ],
    },
    cjs: {
      plugins: productionPlugins,
    },
    esm: {
      plugins: productionPlugins,
    },
    es: {
      plugins: productionPlugins,
    },
    production: {
      plugins: productionPlugins,
    },
    'production-umd': {
      plugins: productionPlugins,
    },
    test: {
      sourceMaps: 'both',
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            root: ['./'],
            alias: defaultAlias,
          },
        ],
      ],
    },
  },
};
