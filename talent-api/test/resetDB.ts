import 'mocha';

import db from '../server/models';

setTimeout(() => run(), process.env.CI ? 10000 : 1000);

before('Syncing and resetting database', async () =>
  db.sequelize.sync({ force: true }).then(() => run())
);
