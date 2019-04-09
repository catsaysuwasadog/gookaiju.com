const fs = require('fs');
const path = require('path');

const componentRegex = /^([A-Z][a-z]+)+\.js/;

function findComponents(directory, components = []) {
  const items = fs.readdirSync(directory);

  items.forEach(item => {
    const itemPath = path.resolve(directory, item);

    if (fs.statSync(itemPath).isDirectory()) {
      findComponents(itemPath, components);
      return;
    }

    if (!componentRegex.test(item)) {
      return;
    }

    components.push({
      filename: itemPath,
    });
  });

  return components;
}

const jsRegex = /\.js$/;
const blackList = ['/.eslintrc', '/_document', '/_app'];

/**
 * returns the Next.js pages available in a nested format
 * @param {*} options
 * @param {*} directory
 * @param {*} pages
 */
function findPages(
  options = {},
  directory = path.resolve(__dirname, '../../pages'),
  pages = [],
) {
  fs.readdirSync(directory).forEach(item => {
    const itemPath = path.resolve(directory, item);
    const pathname = itemPath
      .replace(new RegExp(`\\${path.sep}`, 'g'), '/')
      .replace(/^.*\/pages/, '')
      .replace('.js', '')
      .replace(/^\/index$/, '/') // Replace `index` by `/`.
      .replace(/\/index$/, '');

    // 忽略 .eslintrc 文件
    if (pathname.indexOf('.eslintrc') !== -1) {
      return;
    }

    if (options.front) {
      return;
    }

    if (fs.statSync(itemPath).isDirectory()) {
      const children = [];
      pages.push({
        pathname,
        children,
      });
      findPages(options, itemPath, children);
      return;
    }

    if (!jsRegex.test(item) || blackList.includes(pathname)) {
      return;
    }

    pages.push({
      pathname,
    });
  });

  // sort by pathnames without '-' so that e.g. card comes before card-action
  pages.sort((a, b) => {
    const pathnameA = a.pathname.replace(/-/g, '');
    const pathnameB = b.pathname.replace(/-/g, '');
    if (pathnameA < pathnameB) return -1;
    if (pathnameA > pathnameB) return 1;
    return 0;
  });

  return pages;
}

module.exports = {
  findPages,
  findComponents,
};
