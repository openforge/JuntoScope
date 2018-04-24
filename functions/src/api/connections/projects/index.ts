import * as express from 'express';

import { sessionsRouter } from './sessions';

export const projectsRouter = express.Router({ mergeParams: true });

projectsRouter.use('/:projectId/sessions', sessionsRouter);
