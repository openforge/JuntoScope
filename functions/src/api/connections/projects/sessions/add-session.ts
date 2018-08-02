import * as express from "express";

import * as _ from "lodash";

import {
  firestore,
  encryptionService,
  sessionService,
  teamworkService
} from "./../../../../services";

export async function addSession(req: express.Request, res: express.Response) {
  const uid = res.locals.user.uid;
  const { connectionId, projectId, projectName } = req.params;
  const { taskListIds } = req.body;

  if (!connectionId) {
    return res
      .status(400)
      .json({ message: "Connection id is a required parameter." });
  }

  if (!projectId) {
    return res
      .status(400)
      .json({ message: "Project id is a required parameter." });
  }

  if (!projectName) {
    return res
      .status(400)
      .json({ message: "Project Name is a required parameter." });
  }

  if (!Array.isArray(taskListIds) || taskListIds.length === 0) {
    return res.status(400).json({ message: "Task List Ids is required" });
  }

  const connection = await firestore
    .doc(`/users/${uid}/connections/${connectionId}`)
    .get()
    .then(snapshot => snapshot.data());

  if (!connection) {
    return res.status(400).json({ message: "Invalid connection id." });
  }

  let sessionTasks;
  let newSession;
  try {
    switch (connection.type) {
      case "teamwork": {
        const token = encryptionService.decrypt(connection.token);
        const baseUrl = connection.externalData.baseUrl;

        sessionTasks = await Promise.all(
          taskListIds.map(id => teamworkService.getTasks(token, baseUrl, id))
        ).then(responses => {
          return responses
            .map(response => response.tasks)
            .reduce((allTasks, taskListTasks) => {
              for (const taskId in taskListTasks) {
                if (taskListTasks.hasOwnProperty(taskId)) {
                  allTasks[taskId] = taskListTasks[taskId];
                }
              }
              return allTasks;
            }, {});
        });

        break;
      }

      default: {
        return res.status(400).json({ message: "Unknown Connection Type" });
      }
    }

    newSession = await sessionService.createSession(
      uid,
      connectionId,
      projectId,
      sessionTasks,
      projectName
    );
  } catch (error) {
    return res.status(400).json({ message: error });
  }

  return res.status(201).json(newSession);
}
