const express = require('express');

const server = express();
const port = process.env.PORT || 3000;

require('./router/index')(server);

server.listen(port);
