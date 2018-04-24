import * as express from 'express'

import { firestore, encryptionService, sessionCodeService } from './../../../../services'

export async function addSession(req: express.Request, res: express.Response) {
  const uid = res.locals.user.uid;
  const { connectionId, projectId } = req.params;
  const accessCode = req.body.accessCode;

  console.log(req.body);

  if (!accessCode) {
    res.status(400).json({ message: 'accessCode required' });
  }

  const encryptedCode = encryptionService.encrypt(accessCode);

  const docRef = await firestore.collection(
    `/users/${uid}/connections/${connectionId}/projects/${projectId}/sessions`
  ).add({
    ...req.body,
    accessCode: encryptedCode,
  });

  let sessionCode = await sessionCodeService.generateCode(uid, connectionId, projectId, docRef.id);

  res.status(201).send({
    sessionCode
  });
}
