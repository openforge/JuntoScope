import * as express from 'express';

import {
  firestore,
  encryptionService,
  sessionService,
} from './../../../../services';

export async function addSession(req: express.Request, res: express.Response) {
  const uid = res.locals.user.uid;
  const { connectionId, projectId } = req.params;

  if (!connectionId) {
    return res
      .status(400)
      .json({ message: 'Connection id is a required parameter.' });
  }

  if (!projectId) {
    return res
      .status(400)
      .json({ message: 'Project id is a required parameter.' });
  }

  try {
    // TODO: SessionData should be pulled from the third-party
    // source and NOT passed from request body.
    await sessionService.createSession(uid, connectionId, projectId, req.body);
  } catch (error) {
    return res.status(400).json({ message: error });
  }

  return res.status(201).json();
}
