#mise

a super simple super opinionated nodejs microservice-friendly restful api

here's a sample of how to use mise

```js
const mise = require('mise');

// this is a knex connection
const conn = require('conn.env');

const app = mise();

app.connect(conn)
app.resource({ tableName: 'rooms' });

app.resources.rooms.validate(room => room.id);
app.resources.rooms.validate(room => room.owner);

app.listen(3000);
```

mise is built on koa@2, so you'll have to use the --harmony-async-await until async/await hits v8 natively.

please don't use this in production yet. thanks a bunch.
