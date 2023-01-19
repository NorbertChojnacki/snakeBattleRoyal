const dotenv = require('dotenv');
const colors = require('colors');
const { fork } = require('child_process');

// colors.enable();
dotenv.config({path: __dirname + '/.env'});

const controller = new AbortController();
const { signal } = controller;

const database = fork('./database/index.js', { env: process.env, signal, stdio: 'pipe'});
// const subproject2 = fork('subproject2/index.js', { env: process.env });

database.stdout.on('data', data => console.log(`${colors.yellow('Database:')}\n${data}`));
database.stderr.on('data', err => console.log(`${colors.red('Database:')}\n${err}`));