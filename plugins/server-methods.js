const successAction = (h, data, message = 'OK', statusCode = 200) => {
  return h
    .response({
      statusCode,
      message,
      data: data ? data : undefined
    })
    .code(200);
};

const failAction = (h, err) => {
  return h
    .response({
      statusCode: err.statusCode ? err.statusCode : 400,
      message: err.message ? err.message : 'Internal Server error occurred.'
    })
    .code(400);

  // .code(200)
  // .takeover();
};


module.exports = {
  name: 'server-methods',
  version: '1.0.0',
  register: async (server, options) => {
    server.method('successAction', successAction, {});
    server.method('failAction', failAction, {});
  }
}