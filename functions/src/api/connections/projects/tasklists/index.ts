import * as express from 'express';

import { getTaskLists } from './get-tasklists'

export const tasklistsRouter = express.Router({ mergeParams: true });

tasklistsRouter.get('/', getTaskLists);

tasklistsRouter.get('/:page', getTaskLists);
