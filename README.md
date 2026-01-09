# Zillow Clone - Property Search App

A modern property search application built with Next.js, featuring interactive maps and property listings.

## Features

- 🗺️ Interactive map using Leaflet (OpenStreetMap) - no API key required
- 🏠 Property listings with images
- 📍 Property markers on map
- 🔍 Property detail pages
- 📱 Responsive design

## Tech Stack

- **Next.js 14** - React framework
- **Leaflet** - Open-source mapping library
- **Hygraph** - GraphQL CMS for property data
- **Tailwind CSS** - Styling

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Hygraph Schema

Before running the app, you need to create the schema in Hygraph:

- **Quick Start**: See `HYGRAPH_QUICK_START.md` for a fast setup guide
- **Detailed Guide**: See `HYGRAPH_SCHEMA.md` for complete step-by-step instructions
- **Schema Reference**: See `hygraph-schema-reference.graphql` for the schema structure

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
HYGRAPH_ENDPOINT=your_hygraph_endpoint_here
HYGRAPH_API_TOKEN=your_hygraph_api_token_here
```

See `ENV_SETUP.md` for detailed instructions.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
zillow-clone/
├── app/
│   ├── components/      # React components
│   ├── property/        # Property detail pages
│   ├── globals.css      # Global styles
│   └── page.js          # Home page
├── .env.local           # Environment variables (not in git)
└── next.config.js       # Next.js configuration
```

## Environment Variables

- `HYGRAPH_ENDPOINT` - Your Hygraph GraphQL endpoint URL
- `HYGRAPH_API_TOKEN` - Your Hygraph API token

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
