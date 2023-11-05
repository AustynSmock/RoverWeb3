// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// Variable to store the text data (just for the sake of example)
let storedText = '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch data from the Express server
    const response = await fetch('https://rover-web3.vercel.app/data', {
      method: 'GET'
    });

    const data = await response.json();
    
    // Return the data to the frontend
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    // If text data is sent via POST, store it
    const { text } = req.body;
    
    if (text) {
      storedText = text;
      
      // Send the text to the Express server
      const response = await fetch('https://rover-web3.vercel.app/data', {          //http://localhost:3000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: storedText })
      });

      const expressResponse = await response.json();

      res.status(200).json(expressResponse);
    } else {
      res.status(400).json({ error: 'Text data is required' });
    }
  } else {
    res.status(405).json({ error: 'HTTP Method not allowed' });
  }
}
