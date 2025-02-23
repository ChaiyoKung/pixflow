# PixFlow

An AI-powered application that automatically generates images on a schedule.

## Preparation

Ensure you have MongoDB set up with a replica set. You can use [MongoDB Atlas](https://www.mongodb.com/atlas) to easily configure this.

Create Azure Service Principal and assign roles to it.

```bash
az ad sp create-for-rbac --name "example"
# {
#   "appId": "<app_id>",
#   "displayName": "example",
#   "password": "<password>",
#   "tenant": "<tenant_id>"
# }

az role assignment create --assignee "<app_id>" --role "Cognitive Services OpenAI User" --scope "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-example"
az role assignment create --assignee "<app_id>" --role "Storage Blob Data Contributor" --scope "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-example"
```

## Getting Started

Create `.env` by copying `.env.example`

```bash
cp .env.example .env
```

Install dependencies

```bash
bun install
```

Run the server

```bash
bun dev
```
