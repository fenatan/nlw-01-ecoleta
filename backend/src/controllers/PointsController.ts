import knex from '../database/connection';
import { Request, Response } from 'express';

class PointsController {
  async create(req: Request, res: Response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body;

    const trx = await knex.transaction();

    const ids = await trx('points').insert({
      image: 'imagefake', name, email, whatsapp, latitude, longitude, city, uf,
    });

    const point = {
      image: 'imagefake', name, email, whatsapp, latitude, longitude, city, uf,
    }

    const point_id = ids[0];
    const pointItems = items.map((item_id: Number) => {
      return {
        item_id,
        point_id
      }
    });

    await trx('point_items').insert(pointItems);

    return res.status(200).json({ ...point, id: point_id });
  }
}

export default new PointsController();