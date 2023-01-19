const dotenv = require('dotenv');
const colors = require('colors');
const { fork } = require('child_process');

// colors.enable();
dotenv.config({path: __dirname + '/.env'});

const controller = new AbortController();
const { signal } = controller;

const database = fork('./database/index.js', { env: process.env, signal, stdio: 'pipe'});
const client = fork('./client/index.js', { env: process.env, signal, stdio: 'pipe'});

database.stdout.on('data', data => console.log(`${colors.yellow('Database:')}\n${data}`));
database.stderr.on('data', err => console.log(`${colors.red('Database:')}\n${err}`));

client.stdout.on('data', data => console.log(`${colors.yellow('Client:')}\n${data}`));
client.stderr.on('data', err => console.log(`${colors.red('Client:')}\n${err}`));