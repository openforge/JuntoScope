import * as express from 'express';

import { getTaskLists } from './get-tasklists';

import { getTasks } from './get-tasks';

export const tasklistsRouter = express.Router({ mergeParams: true });

tasklistsRouter.get('/', getTaskLists);

tasklistsRouter.get('/:tasklistId', getTasks);
