const amuse = require('../src/index');
const conn = require('./conn');

const middleware1 = require('./fakemiddleware');
const middleware2 = require('./fakemiddleware');

const app = amuse();

app.connect(conn);

app.middlewares.add(middleware1);

app.resource({ tableName: 'rooms' });

app.resources.rooms.validates('owner', room => room.owner);
app.resources.rooms.validates('description', room => room.description);
app.resources.rooms.validates('description', room => room.description.length > 5, 'Descriptions must be at least five characters long');

app.resources.rooms.middlewares.add(middleware2);

app.listen(3000);
