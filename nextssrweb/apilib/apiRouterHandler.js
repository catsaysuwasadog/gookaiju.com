import navigationRouter from 'apilib/api/navigation';

function apiRouterHandler(server) {
  server.use('/api/v1/navigationresource', navigationRouter);
}

export default apiRouterHandler;
