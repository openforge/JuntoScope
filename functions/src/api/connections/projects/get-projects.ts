import * as express from 'express';

export async function getProjects(req: express.Request, res: express.Response) {

  // Should get connection (from route Param)
  // Should use appropriate service (teamwork for now)
  //   to fetch projects under given connection.

  // Should return List of projects on success
  // or appropriate error.

  res.json([]);
}
