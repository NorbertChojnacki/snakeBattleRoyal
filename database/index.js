const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const rooms = jsonServer.router(path.join(__dirname, 'json/rooms.json'));
const middleware = jsonServer.defaults();

server.use(rooms);
server.use(middleware);

const PORT = process.env.DATABASE_PORT || 3000;
const HOST = process.env.DATABASE_HOST || "127.0.0.1";

server.listen(PORT, HOST, ()=>{
    console.log(`Database server is listening on: \n
    PORT: ${PORT}\n
    HOST: ${HOST}`)
});