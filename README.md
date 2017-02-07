#amuse (ah mooz)
[![Build Status](https://travis-ci.org/blueseph/amuse.svg?branch=master)](https://travis-ci.org/blueseph/amuse)

a super simple super opinionated nodejs microservice-friendly restful api

### npm install

`npm install amuse`

### examples

##### simple
```js
const amuse = require('amuse');

const conn = require('conn.env');
const app = amuse();

app.connect(conn);

app.resource({ tableName: 'rooms' });

app.listen(3000);
```

##### detailed with commentary
```js
const amuse = require('amuse');
const loggerMiddleware = require('./middlewares/logger');
const roomMiddleware = require('./middlewares/room/middleware');

/*
  const conn = {
    client: 'mysql',
    connection: {
      host: 'host',
      user: 'user',
      password: 'password',
      database: 'database',
      charset: 'charset',
    },
  };
*/
const conn = require('conn.env');

const app = amuse();

app.connect(conn);

// this is a bookshelf model
app.resource({ tableName: 'rooms' });

// this middleware runs on all requests
app.middlewares.add(loggerMiddleware);

/*  all middleware and validator additions return an unsubscribe function.
    if at any time you want to opt out, just call the unsub function */
const unsub = app.middleware.add(loggerMiddleware);
unsub();

// these validators happen when creating/updating a model
app.resources.rooms.validates(room => room.owner);
app.resources.rooms.validates(room => room.title);
app.resources.rooms.validates(room => room.description);
app.resources.rooms.validates(
  room => room.description.length > 10,
  'Room description must be at least 10 characters'
);

// this middleware runs on only requests to room resources
app.resources.rooms.middlewares.add(roomMiddleware);

/*
  all of these are automatically created

  GET localhost:3000/rooms/
    [{ id: 1, description: '...', title: '...'}, { id: 2, description: '...', title: '...'}]
  GET localhost:3000/rooms/1
    { id: 1, description: '...', title: '...'}
  POST localhost:3000/rooms/
  { description: '...', title: '...' }
    { id: 3, description: '...', title: '...' }
  UPDATE localhost:3000/rooms/3
  { id: 3, description: '---', title: '---' }
    { id: 3, description: '---', title: '---' }
  DELETE localhost:3000/rooms/3
    {}
*/
app.listen(3000);
```

### notes
amuse is built on koa@2, so you'll have to use the --harmony-async-await until async/await hits v8 natively.

you might have to add your own flavor of database connection - postgres, maria, sqlserver. just npm install it.

please don't use this in production yet. thanks a bunch
