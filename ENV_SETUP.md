# Environment Variables Setup

## Create .env.local file

Create a `.env.local` file in the root of the project with the following content:

```env
HYGRAPH_ENDPOINT=your_hygraph_endpoint_here
HYGRAPH_API_TOKEN=your_hygraph_api_token_here
```

## Steps:

1. In the root directory (`zillow-clone`), create a new file named `.env.local`
2. Add the two variables above with your actual Hygraph credentials
3. Save the file

The `.env.local` file is already in `.gitignore` and will not be committed to git.

## Example:

```env
HYGRAPH_ENDPOINT=https://api-us-east-1.hygraph.com/v2/your-project-id/master
HYGRAPH_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

