import * as express from "express";

import { setEstimate } from "./set-estimate";

export const estimateRouter = express.Router({ mergeParams: true });

estimateRouter.put(
  "/:ownerId/connections/:connectionId/sessions/:sessionId/tasks/:taskId",
  setEstimate
);
