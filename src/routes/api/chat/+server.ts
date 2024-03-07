import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
 
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
 
export const config = {
  runtime: 'edge'
};
 
export const POST: RequestHandler = async ({ request }) =>  {
  const { messages } = await request.json();
 
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });
 
  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}