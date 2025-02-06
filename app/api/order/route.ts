import { NextApiRequest, NextApiResponse } from 'next';
import { client } from 'sanity/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const orderData = req.body;
      const order = await client.create(orderData);
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Failed to create order' });
    }
  } else if (req.method === 'GET') {
    try {
      const query = `*[_type == "order"]{
        _id,
        customer,
        status,
        total,
        date
      }`;
      const orders = await client.fetch(query);
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
