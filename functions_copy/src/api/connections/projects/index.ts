import * as express from 'express';

import { getProjects } from './get-projects';
import { sessionsRouter } from './sessions';
import { tasklistsRouter } from './tasklists';

export const projectsRouter = express.Router({ mergeParams: true });

projectsRouter.get('/', getProjects);

projectsRouter.use('/:projectId/tasklists', tasklistsRouter);

projectsRouter.use('/:projectId/sessions', sessionsRouter);
