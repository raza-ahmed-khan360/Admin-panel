import { client } from 'sanity/lib/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const analytics = await client.fetch('*[_type == "analytics"]');
      res.status(200).json(analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ message: 'Failed to fetch analytics' });
    }
  } else if (req.method === 'POST') {
    try {
      const { action, data } = req.body;
      let updatedAnalytics;

      if (action === 'update') {
        updatedAnalytics = await client.patch(data._id).set(data).commit();
      } else if (action === 'create') {
        updatedAnalytics = await client.create(data);
      }

      res.status(201).json(updatedAnalytics);
    } catch (error) {
      console.error('Error updating analytics:', error);
      res.status(500).json({ message: 'Failed to update analytics' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
