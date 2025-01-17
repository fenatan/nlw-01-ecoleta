import knex from '../database/connection';
import { Request, Response } from 'express';

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.1.8:8000/uploads/${item.image}`
      }
    })
    return res.status(200).json(serializedItems);
  }
}

export default new ItemsController();