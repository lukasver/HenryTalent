import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import candidatesRouter from './api/controllers/candidates/router';
import skillsRouter from './api/controllers/skills/router';
import recruitersRouter from './api/controllers/recruiters/router';
import foldersRouter from './api/controllers/folders/router';
import usersRouter from './api/controllers/users/router';
import comments from './api/controllers/comments/router';
import cohortRouter from './api/controllers/cohorts/router';

export default function routes(app: Application): void {
  app.use('/api/v1/candidates', candidatesRouter);
  app.use('/api/v1/skills', skillsRouter);
  app.use('/api/v1/recruiters', recruitersRouter);
  app.use('/api/v1/folders', foldersRouter);
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/cohorts', cohortRouter);
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/comments', comments);
}
