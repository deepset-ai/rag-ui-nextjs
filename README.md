## About

This repo contains a simple UI inspired by the [Playground](https://docs.cloud.deepset.ai/docs/run-a-search) feature of deepset Cloud. We’ve created it to help you interact with RAG pipelines deployed on deepset Cloud. It’s meant for illustrative purposes only and may not include all necessary security measures, optimizations, or features required for a full production environment. Use this code as a boilerplate project to help you get started, and make sure you thoroughly review, test, and enhance it before considering production deployment.

The code in this repo works with both deepset Cloud 1.0 and 2.0 pipelines.

## What's inside

This is a [Next.js](https://nextjs.org/) project built using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Here is a breakdown of its main components:

- ```page.js``` - Main page and UI elements.
- ```route.js``` - Server-side code that adds a Next.js route for ```/api/search``` and calls deepset Cloud's API.
- ```ragPipelineResponse.js``` - Classes describing how we map the data.
- ```ragUtils.js``` - A mini utility function that combines the answer from the JSON response with the references.

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

## Dependencies

This project uses [MUI](https://mui.com/) and a couple of additional React packages. For the initial installation, run:

```
npm install @mui/material @emotion/react @emotion/styled react-markdown
```

(Check [package.json](https://github.com/deepset-ai/example-rag-ui/blob/main/package.json) for a full list of dependencies.)


## Prerequisites

Before you start, make sure you have:

- Created and deployed a RAG pipeline in deepset Cloud. We recommend using a RAG question answering [pipeline template](https://docs.cloud.deepset.ai/docs/pipeline-templates) from the *Basic QA* collection in deepset Cloud. Make sure the pipeline status is *indexed*.
- [Uploaded data](https://docs.cloud.deepset.ai/docs/upload-files) for your RAG pipeline to query. The data must be in the same deepset Cloud workspace as the RAG pipeline.
- Generated an API key to connect to deepset Cloud. You’ll find it in [Connections](https://cloud.deepset.ai/settings/connections). (Keep the key secure!)
- Run the following code to test if your pipeline is working:

```
% curl --request POST \
--url https://api.cloud.deepset.ai/api/v1/workspaces/YOUR_WORKSPACE_NAME/pipelines/YOUR_RAG_PIPELINE_NAME/search \
--header 'accept: application/json' \
--header 'content-type: application/json' \
--header 'authorization: Bearer YOUR_API_KEY' \
--data '{ "debug": false, "view_prompts": false, "queries": [ "What is GenAI?" ] }'
```

## Configuration

Define the following environment variables in ```.env.local``` or [export](https://www.man7.org/linux/man-pages/man1/export.1p.html) them manually.

``` 
DEEPSET_CLOUD_WORKSPACE=YOUR_WORKSPACE_NAME
DEEPSET_CLOUD_PIPELINE=YOUR_RAG_PIPELINE_NAME
DEEPSET_CLOUD_API_KEY=YOUR_API_KEY
```

## Running the UI locally

1. Clone the repo.
2. Install dependencies:

```bash
npm install
```

3. Start the development server to check the UI locally:

```
npm run dev
```

4. In your browser, open [http://localhost:3000](http://localhost:3000) to access the UI.

![how-to-build-an-ai-product](https://github.com/deepset-ai/example-rag-ui/assets/56412611/1b92c7f2-3a7f-4048-923d-5e240e1e6f82)

5. When you’re done testing, stop the development server with Ctrl-C.

## OpenAPI specification file

You can download the [OpenAPI](https://spec.openapis.org/oas/latest.html) specification of deepset Cloud's REST API as follows:

```
curl --request GET --url 'https://api.cloud.deepset.ai/openapi.json' \
--header 'accept: application/json' \
--header 'authorization: Bearer YOUR_API_KEY'
```

## Example JSON response

When you use the ```/search``` API endpoint in deepset Cloud, you get a response similar to the one below (we’ve shortened it for clarity).

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

The two main objects you want to focus on are:

1. The ```answers``` object: It contains a list of answers generated by the model, along with details like the type and files and documents it’s based on.
2. The ```documents``` object: This is a list of documents the answer is based on.

*Note: The contents of ```answers``` and ```documents``` may differ depending on your pipeline configuration.*

## Learn more

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
