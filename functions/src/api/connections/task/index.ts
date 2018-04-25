import * as express from 'express';

import { getTask } from './get-task';

import { putEstimate } from './put-estimate';

export const taskRouter = express.Router({ mergeParams: true });

taskRouter.get('/:taskId', getTask);

taskRouter.put('/:taskId', putEstimate);