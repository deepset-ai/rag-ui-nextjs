// src/app/api/search/route.js

import { RagPipelineResponse, RagResult, RagAnswer, RagDocument } from '@/lib/ragPipelineResponse';

const workspace = process.env.DEEPSET_CLOUD_WORKSPACE || 'default';
const pipeline = process.env.DEEPSET_CLOUD_PIPELINE || 'my-pipeline';
const apiToken = process.env.DEEPSET_CLOUD_API_KEY;

const apiUrl = `https://api.cloud.deepset.ai/api/v1/workspaces/${workspace}/pipelines/${pipeline}/search`;

export async function POST(request) {
  const { query } = await request.json();

  console.log(`${__filename}: Received text:`, query);

  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        debug: false,
        view_prompts: false,
        queries: [query],
      }),
    };

    console.log(`${__filename}: apiUrl:`, apiUrl);
    console.log(`${__filename}: Request Options:\n`, requestOptions);

    const res = await fetch(apiUrl, requestOptions);

    const data = await res.json();

    console.log(`${__filename}: Response Data:\n`, data);

    const ragResponse = new RagPipelineResponse(data);

    ragResponse.processResults();

    console.log(`${__filename}: Processed and returning:\n`, ragResponse);

    return new Response(JSON.stringify({ response: ragResponse }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`${__filename}: Error:`, error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
