import * as express from 'express'

import { firestore, encryptionService, sessionService } from './../../../../services'

export async function addSession(req: express.Request, res: express.Response) {
  const uid = res.locals.user.uid;
  const { connectionId, projectId } = req.params;
  const { accessCode, expirationDate } = sessionService.generateAccessCode();

  const docRef = await firestore.collection(
    `/users/${uid}/connections/${connectionId}/sessions`
  ).add({
    ...req.body,
    accessCode: accessCode,
    expirationDate: expirationDate,
  });

  let sessionCode = await sessionService.generateCode(uid, connectionId, projectId, docRef.id);

  res.status(201).send({
    sessionCode,
    accessCode,
    expirationDate
  });
}
