import * as express from 'express';
import { firestore, teamworkService, encryptionService } from './../../../../services';

export async function getTaskLists(req: express.Request, res: express.Response) {
  const uid = res.locals.user.uid;
  const connectionId = req.params.connectionId;
  const projectId = req.params.projectId;
  let page = 1;
  if (req.params.page) {
    page = req.params.page;
  }

  let connectionRef;
  try {
  	connectionRef = await firestore.collection(`/users/${uid}/connections`).doc(connectionId).get();
  } catch(error) {
  	return res.status(400).json({ message: 'Error getting connection' });
  }

  const connection = connectionRef.data();

  switch (connection.type.toLowerCase()) {
    case 'teamwork': {
      
      let teamworkResponse;
      try {
        teamworkResponse = await teamworkService.getTaskLists(encryptionService.decrypt(connection.token), connection.externalData.baseUrl, projectId, page);
      } catch(error) {
        return res.status(400).json({ message: error.message });
      }

      return res.json(teamworkResponse);
    }

    default: {
      return res.status(400).json({ message: 'Unknown Connection Type' });
    }
  }
}
