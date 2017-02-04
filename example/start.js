const amuse = require('../src/index');
const conn = require('./start');

const middleware1 = require('./fakemiddleware');
const middleware2 = require('./fakemiddleware');

const app = amuse();

app.connect(conn);

app.middlewares.add(middleware1);

app.resource({ tableName: 'example' });

app.resources.example.validate(e => e.id);
app.resources.example.middlewares.add(middleware2);

app.listen(3000);
