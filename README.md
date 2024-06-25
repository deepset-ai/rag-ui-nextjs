Here's an example of a frontend application that uses deepset Cloud backend API.

## Getting Started

This is a bootstrapped [Next.js](https://nextjs.org/) project. It requires `node` and `npm`.

After cloning this repository, run:

```bash
npm install
```

Before starting the development server, create the following local file with the environment variables describing your deepset Cloud workspace, pipeline and your API key.

```bash
cat > .env.local
```

```bash
DEEPSET_CLOUD_WORKSPACE=my-workspace
DEEPSET_CLOUD_PIPELINE=my-rag-qa-gpt-4
DEEPSET_CLOUD_API_KEY=api_[..]
```

(Alternatively, export the above environment variables manually.)

Run the development server:

```bash
npm run dev
```

(Or `yarn dev` etc.)

Open [http://localhost:3000](http://localhost:3000) with your browser to test this example UI accessing the RAG pipeline search API.

<img width="1961" alt="example-rag-ui" src="https://github.com/deepset-ai/example-rag-ui/assets/56412611/9fd872e8-ac12-4031-81bd-30ed5654c6c4">

## deepset Cloud API

This example uses the [pipeline search API](https://docs.cloud.deepset.ai/reference/search_api_v1_workspaces__workspace_name__pipelines__pipeline_name__search_post). Start reading about deepset Cloud's API [here](https://docs.cloud.deepset.ai/reference/api-overview).

## Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
