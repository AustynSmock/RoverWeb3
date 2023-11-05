// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// Variable to store the text data (just for the sake of example)
let storedText = '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return the data to the frontend
    res.status(200).json(storedText);
  } else if (req.method === 'POST') {
    // If text data is sent via POST, store it
    const { text } = req.body;
    
    if (text) {
      storedText = text;
      res.status(200).json(storedText);
    } else {
      res.status(400).json({ error: 'Text data is required' });
    }
  } else {
    res.status(405).json({ error: 'HTTP Method not allowed' });
  }
}
