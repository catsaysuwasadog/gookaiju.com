/* eslint-disable no-console */

import path from 'path';
import fse from 'fs-extra';
import { pageToTitle } from 'src/modules/utils/helpers';
import pages from 'src/pages';

async function run() {
  try {
    const translationsFilename = path.join(__dirname, '../translations/translations.json');
    const translationsFile = await fse.readFile(translationsFilename, 'utf8');
    const output = JSON.parse(translationsFile);

    const traverse = pages2 => {
      pages2.forEach(page => {
        if (page.pathname.indexOf('api') === -1) {
          const title = pageToTitle(page);

          if (title) {
            output.pages[page.pathname] = title;
          }
        }

        if (page.children) {
          traverse(page.children);
        }
      });
    };

    traverse(pages);

    await fse.writeFile(translationsFilename, `${JSON.stringify(output, null, 2)}\n`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

run();