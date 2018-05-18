import * as express from 'express';

import { sessionService } from '../../services';

export async function setEstimate(req: express.Request, res: express.Response) {
  const uid = res.locals.user.uid;
  const ownerId = req.params.ownerId;
  const connectionId = req.params.connectionId;
  const sessionId = req.params.sessionId;
  const taskId = req.params.taskId;
  const estimate = req.body.estimate;

  if (!uid) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }
  if (!ownerId) {
    return res.status(400).json({ message: 'Owner ID is required.' });
  }
  // The user must be the moderator of this session
  if (ownerId !== uid) {
    return res.status(401).json({ message: 'Permission denied.' });
  }
  if (!connectionId) {
    return res.status(400).json({ message: 'Connection ID is required.' });
  }
  if (!sessionId) {
    return res.status(400).json({ message: 'Session ID is required.' });
  }
  if (!taskId) {
    return res.status(400).json({ message: 'Task ID is required.' });
  }
  if (!estimate) {
    return res.status(400).json({ message: 'Estimate is required.' });
  }

  try {
    await sessionService.setTaskEstimate(
      uid,
      ownerId,
      connectionId,
      sessionId,
      taskId,
      estimate
    );
  } catch (error) {
    return res.status(400).json({ message: error });
  }

  return res.send(204);
}
