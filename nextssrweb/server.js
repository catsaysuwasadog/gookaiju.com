import http from 'http';
import express from 'express';
import url from 'url';
import next from 'next';
import log from 'modules/log';
import { addTeardown } from 'modules/handleKillSignals';
import { pathnameToLanguage } from 'src/modules/utils/helpers';


const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
});
const nextHandler = nextApp.getRequestHandler();

addTeardown({
  callback: () => nextApp.close(),
  nice: 2,
});

async function run() {
  await nextApp.prepare();
  const app = express();

  app.get('*', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let { pathname } = parsedUrl;
    const { userLanguage, canonical } = pathnameToLanguage(pathname);

    if (userLanguage !== 'en') {
      pathname = canonical;
      if (pathname !== '/') {
        pathname = pathname.replace(/\/$/, '');
      }
      nextApp.render(req, res, pathname, {
        userLanguage,
        ...parsedUrl.query,
      });
      return;
    }

    nextHandler(req, res);
  });

  const server = http.createServer(app);
  const port = parseInt(process.env.PORT, 10) || 10240;
  const host = '127.0.0.1';

  server.listen(port, host, err => {
    if (err) {
      throw err;
    }
    log.info({
      name: 'http',
      msg: `ready on http://${server.address().address}:${server.address().port}`,
    });
  });

  addTeardown({
    callback: () => {
      log.info({
        name: 'http',
        msg: 'server is stopping',
      });
      return new Promise((resolve, reject) => {
        server.close(err => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    },
    nice: 1,
  });
}

run();
