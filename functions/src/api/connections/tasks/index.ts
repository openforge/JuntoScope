import * as express from 'express';

import { getTask } from './get-task';

import { putEstimate } from './put-estimate';

export const tasksRouter = express.Router({ mergeParams: true });

tasksRouter.get('/:taskId', getTask);

tasksRouter.put('/:taskId', putEstimate);