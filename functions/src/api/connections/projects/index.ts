import * as express from 'express';

import { getProjects } from './get-projects';
import { sessionsRouter } from './sessions';

export const projectsRouter = express.Router({ mergeParams: true });

projectsRouter.get('/', getProjects);

projectsRouter.use('/:projectId/sessions', sessionsRouter);
