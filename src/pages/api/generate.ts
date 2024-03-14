import { NextApiRequest, NextApiResponse } from 'next';

import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';

import { PROMPT } from '@/constants';

dotenv.config({ path: __dirname + '/.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `${PROMPT} ${req.body.question}`,
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      max_tokens: 250,
      top_p: 1,
    });

    res.status(200).json({ answer: completion.choices[0].message.content });
  } catch (e) {
    console.error('OpenAI API ENCOUNTERED AN ERROR: ', e);
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
  }
}
