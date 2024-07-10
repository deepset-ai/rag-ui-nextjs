## Prerequisites

This simple UI was inspired by the [Playground](https://docs.cloud.deepset.ai/docs/run-a-search) interface and is intended to be used with a RAG pipeline deployed on deepset Cloud. The pipeline can be created from a template in "Basic QA" collection.

Documents have uploaded to the workspace, and the pipeline has to be deployed and active (status = "Indexed").

You'll find the API key in [Connections.](https://cloud.deepset.ai/settings/connections)

Testing the pipeline API is as easy as the following:

```
% curl --request POST \
--url https://api.cloud.deepset.ai/api/v1/workspaces/your-workspace/pipelines/your-RAG-pipeline-name/search \
--header 'accept: application/json' \
--header 'content-type: application/json' \
--header 'authorization: Bearer your-api-key-here' \
--data '{ "debug": false, "view_prompts": false, "queries": [ "What is GenAI?" ] }'
```

## Configuration

The following environment variables have to be defined in ```.env.local``` or [exported](https://www.man7.org/linux/man-pages/man1/export.1p.html) manually.

``` 
DEEPSET_CLOUD_WORKSPACE=your-workspace
DEEPSET_CLOUD_PIPELINE=your-RAG-pipeline-name
DEEPSET_CLOUD_API_KEY=your-api-key-here
```

## Running the UI locally

You can start the development server as follows to check the UI locally:

```bash
npm install
```

```
npm run dev
```

(Or ```yarn dev``` or ```pnpm dev``` or ```bun dev```.)

Open [http://localhost:3000](http://localhost:3000) with your browser to access the UI.

![how-to-build-an-ai-product](https://github.com/deepset-ai/example-rag-ui/assets/56412611/1b92c7f2-3a7f-4048-923d-5e240e1e6f82)

## What's inside

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The code is split across just a few short components:

- ```page.js``` - Main page + UI.
- ```route.js``` - This is the server-side code that adds a Next.js route for ```/api/search``` and calls deepset Cloud's API.
- ```ragPipelineResponse.js``` - Classes describing the data mapping.
- ```ragUtils.js``` - A mini utility function to combine the answer from the JSON response with the references.

Here's the project structure:

```
src
├── app
│   ├── api
│   │   └── search
│   │       └── route.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── lib
│   └── ragPipelineResponse.js
└── utils
    └── ragUtils.js
```

## OpenAPI specification file

You can download the [OpenAPI](https://spec.openapis.org/oas/latest.html) specification of the deepset Cloud's REST API as follows:

```
curl --request GET --url 'https://api.cloud.deepset.ai/openapi.json' \
--header 'accept: application/json' \
--header 'authorization: Bearer your-api-key-here'
```

## Example JSON response

The ```/search``` API route in deepset Cloud returns something like the following (the response object below was truncated for clarity). There are basically two main objects to look for - ```answers``` and ```documents```.

```
{
  "query_id": "1685386a",
  "results": [
    {
      "query_id": "1685386a",
      "query": "how to build an ai product?",
      "answers": [
        {
          "answer": "To build an AI product, follow these steps:\n\n1. **Identify Your Use Case**:\n   - Define what you will be using AI for and how it brings measurable value to your business.\n   - Get business and technical people together to brainstorm and prioritize use cases based on value and effort.\n\n2. **Assemble Your Team**:\n   - Key roles include a product leader, AI engineer, domain expert, and software engineers.\n   - The product leader manages stakeholders, establishes the product vision, and keeps delivery on track.\n   - The AI engineer should understand the AI landscape, have prompt engineering skills, and a strong product mindset [..]",
          "type": "generative",
          "document_ids": [
            "de71358c1604a3655fdad65ec5d7d536"
          ],
          "meta": {
            "_references": [
              {
                "document_id": "de71358c1604a3655fdad65ec5d7d536",
                "answer_start_idx": 0,
                "answer_end_idx": 170,
                "doc_start_idx": 537,
                "doc_end_idx": 922,
                "score": 0.9981470108032227,
                "label": "grounded"
              }
            ]
          },
          "file": {
            "id": "02aac1e3-486b-444d-821e-937ec57082ad",
            "name": "5 Steps to a successful Gen AI Pilot.docx.txt"
          }
        }
      ],
      "documents": [
        {
          "id": "de71358c1604a3655fdad65ec5d7d536",
          "content": "Hi everyone, glad to be here today. Let me just share my screen and then we can get right into it. Today I'm talking about how to run a successful gen AI pilot and I'm very sure that the topic is top of mind for a lot of people because 2023 was actually an incredible year for AI [..]",
          "content_type": "text",
          "meta": {
            "file_name": "5 Steps to a successful Gen AI Pilot.docx.txt",
          }
        }
      ]
    }
  ]
}
```

## Dependencies

This project uses [MUI](https://mui.com/) and a couple of additional React packages on top:

```
npm install @mui/material @emotion/react @emotion/styled react-markdown
```

(Check [package.json](https://github.com/deepset-ai/example-rag-ui/blob/main/package.json) for more.)

## Learn more

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
