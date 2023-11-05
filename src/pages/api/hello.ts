// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch('http://localhost:3000/',{
  method:'GET',
  })
  res.status(200).json(await data.json())
}
