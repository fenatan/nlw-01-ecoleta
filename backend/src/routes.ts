import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (req, res) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      iamge_url: `http://localhost:3333/uploads/item.image`
    }
  })
  return res.status(200).json(serializedItems);
});

routes.post('/points', async (req, res) => {

  const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body;

  const trx = await knex.transaction();

  const ids = await trx('points').insert({
    image: 'imagefake', name, email, whatsapp, latitude, longitude, city, uf,
  });

  const pointItems = items.map((item_id: Number) => {
    return {
      item_id,
      point_id: ids[0]
    }
  });

  await trx('point_items').insert(pointItems);

  return res.status(200).json({ succsess: true });
});

export default routes;