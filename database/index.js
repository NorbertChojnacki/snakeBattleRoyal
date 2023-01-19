const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const rooms = jsonServer.router(path.join(__dirname, 'json/rooms.json'));
const middleware = jsonServer.defaults();

server.use(rooms);
server.use(middleware);

server.listen(process.env.DATABASE_PORT, process.env.DATABASE_HOST, ()=>{
    console.log(`Database server is listening on: \n
    PORT: ${process.env.DATABASE_PORT}\n
    HOST: ${process.env.DATABASE_HOST}`)
});