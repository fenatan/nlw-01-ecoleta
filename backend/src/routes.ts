import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.status(200).send('Heeeeeey');
});

export default routes;