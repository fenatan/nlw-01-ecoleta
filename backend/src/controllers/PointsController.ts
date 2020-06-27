import knex from '../database/connection';
import { Request, Response } from 'express';

class PointsController {

  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
    .split(',')
    .map(item => Number(item.trim()));

    const points = await knex('points')
    .join('point_items', 'points.id', '=', 'point_items.point_id')
    .whereIn('point_items.item_id', parsedItems)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select('points.*');

    return res.status(200).json(points);
  }

  async create(req: Request, res: Response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body;

    const trx = await knex.transaction();

    const ids = await trx('points').insert({
      image: 'imagefake', name, email, whatsapp, latitude, longitude, city, uf,
    });

    const point = {
      image: 'https://blog.guiabolso.com.br/wp-content/uploads/2018/02/mercado-1-1024x681.jpg', name, email, whatsapp, latitude, longitude, city, uf,
    }

    const point_id = ids[0];
    const pointItems = items.map((item_id: Number) => {
      return {
        item_id,
        point_id
      }
    });

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return res.status(200).json({ ...point, id: point_id });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point)
      return res.status(404).json({ msg: 'Point not found' });

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');
    return res.status(200).json({ point, items });
  }
}

export default new PointsController();