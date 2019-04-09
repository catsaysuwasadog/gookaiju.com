/* eslint-disable no-console */

import path from 'path';
import fse from 'fs-extra';

async function prepend(file, string) {
  const data = await fse.readFile(file, 'utf8');
  await fse.writeFile(file, string + data, 'utf8');
}

async function run() {
  const swDest = path.join(__dirname, '../build/export/serviceworker.js');
  const swSrc = path.join(__dirname, '../serviceworker.js');

  await fse.copy(swSrc, swDest);
  await prepend(
    swDest,
    `
// uuid: ${new Date()}
`,
  );

  console.log('Successfully built service worker');
}

run();
