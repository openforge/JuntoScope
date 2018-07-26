import * as express from "express";

import { addConnection } from "./add-connection";
import { projectsRouter } from "./projects";
import { tasksRouter } from "./tasks";
import { deleteConnection } from "./delete-connection";

export const connectionsRouter = express.Router({ mergeParams: true });

connectionsRouter.post("/", addConnection);

connectionsRouter.post("/:connectionId", deleteConnection);

connectionsRouter.use("/:connectionId/projects", projectsRouter);

connectionsRouter.use("/:connectionId/tasks", tasksRouter);
