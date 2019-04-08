/* eslint-env serviceworker */
/* eslint-disable no-restricted-globals */
/* global workbox */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0-alpha.0/workbox-sw.js');

workbox.core.setCacheNameDetails({
  prefix: 'gookaiju',
});
workbox.routing.registerRoute(/(\/|\.js)$/, workbox.strategies.staleWhileRevalidate());
self.addEventListener('message', event => {
  switch (event.data) {
    case 'skipWaiting':
      self.skipWaiting();
      // self.clients.claim();
      break;
    default:
      break;
  }
});
