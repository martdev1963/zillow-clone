# Hygraph Schema Setup Guide

This guide will help you create the schema in Hygraph that matches your Zillow clone app.

## Required Models

Your app needs one main model: **Property**

## Step-by-Step Setup

### 1. Create the Location Model (Embedded)

1. Go to your Hygraph project
2. Navigate to **Schema** in the left sidebar
3. Click **Add Model**
4. Name it: `Location`
5. Set it as **Embedded** (not a standalone model)
6. Add the following fields:

| Field Name | API ID | Type | Required | Description |
|------------|--------|------|----------|-------------|
| Latitude | `latitude` | Float | ✅ Yes | Property latitude coordinate |
| Longitude | `longitude` | Float | ✅ Yes | Property longitude coordinate |

**Field Configuration:**
- **Latitude** (`latitude`):
  - Type: Float
  - Required: Yes
  - Validations: None
  
- **Longitude** (`longitude`):
  - Type: Float
  - Required: Yes
  - Validations: None

### 2. Create the Property Model

1. Click **Add Model**
2. Name it: `Property`
3. Make sure it's **NOT** embedded (it's a standalone model)
4. Add the following fields:

| Field Name | API ID | Type | Required | Description |
|------------|--------|------|----------|-------------|
| Name | `name` | Single line text | ✅ Yes | Property name/title |
| Slug | `slug` | Slug | ✅ Yes | URL-friendly identifier (unique) |
| Beds | `beds` | Integer | ✅ Yes | Number of bedrooms |
| Rental Price | `rentalPrice` | Integer | ✅ Yes | Monthly rental price |
| Description | `description` | Rich text | ❌ No | Property description |
| Images | `images` | Asset | ❌ No | Property images (multiple) |
| Location | `location` | Location (embedded) | ✅ Yes | Property location coordinates |

**Field Configuration:**

- **Name** (`name`):
  - Type: Single line text
  - Required: Yes
  - Validations: None

- **Slug** (`slug`):
  - Type: Slug
  - Required: Yes
  - Validations: Unique
  - Based on: `name` field (auto-generate from name)

- **Beds** (`beds`):
  - Type: Integer
  - Required: Yes
  - Validations: Minimum value: 0

- **Rental Price** (`rentalPrice`):
  - Type: Integer
  - Required: Yes
  - Validations: Minimum value: 0

- **Description** (`description`):
  - Type: Rich text (or Multi-line text if you prefer)
  - Required: No
  - Validations: None

- **Images** (`images`):
  - Type: Asset
  - Required: No
  - Allow multiple: ✅ Yes
  - Allowed file types: Images only

- **Location** (`location`):
  - Type: Location (the embedded model you created)
  - Required: Yes
  - Validations: None

### 3. Configure Public API Permissions

1. Go to **Settings** → **API Access**
2. Under **Public Content API**, make sure:
   - ✅ Read access is enabled for `Property` model
   - ✅ Read access is enabled for `Location` model
   - ✅ Read access is enabled for `Asset` model

### 4. Create Sample Data

After creating the schema, add some sample properties:

**Example Property 1:**
- Name: `Palm Beach Apartment`
- Slug: `palm-beach-apartment` (auto-generated)
- Beds: `2`
- Rental Price: `2500`
- Description: `Beautiful 2-bedroom apartment in Palm Beach with ocean views.`
- Location:
  - Latitude: `26.7056`
  - Longitude: `-80.0364`
- Images: Upload 2-3 property images

**Example Property 2:**
- Name: `Downtown Miami Loft`
- Slug: `downtown-miami-loft` (auto-generated)
- Beds: `1`
- Rental Price: `1800`
- Description: `Modern loft in the heart of downtown Miami.`
- Location:
  - Latitude: `25.7617`
  - Longitude: `-80.1918`
- Images: Upload 2-3 property images

**Example Property 3:**
- Name: `Beachfront Condo`
- Slug: `beachfront-condo` (auto-generated)
- Beds: `3`
- Rental Price: `3500`
- Description: `Spacious 3-bedroom beachfront condo with stunning views.`
- Location:
  - Latitude: `25.7907`
  - Longitude: `-80.1300`
- Images: Upload 2-3 property images

## GraphQL Queries Reference

Your app uses these queries. Make sure your schema supports them:

### Get All Properties
```graphql
query PropertiesQuery {
  properties {
    beds
    description
    images {
      fileName
      url
    }
    location {
      latitude
      longitude
    }
    name
    rentalPrice
    slug
    id
  }
}
```

### Get Single Property by Slug
```graphql
query PropertyQuery($slug: String!) {
  property(where: { slug: $slug }) {
    beds
    description
    images {
      fileName
      url
    }
    location {
      latitude
      longitude
    }
    name
    rentalPrice
    slug
    id
  }
}
```

## Quick Schema Summary

```
Location (Embedded Model)
├── latitude (Float, Required)
└── longitude (Float, Required)

Property (Model)
├── name (Single line text, Required)
├── slug (Slug, Required, Unique)
├── beds (Integer, Required)
├── rentalPrice (Integer, Required)
├── description (Rich text, Optional)
├── images (Asset, Multiple, Optional)
└── location (Location, Required)
```

## Troubleshooting

### Issue: "Cannot query field 'properties'"
- **Solution**: Make sure the model is named exactly `Property` (singular) and you have public read access enabled.

### Issue: Images not showing
- **Solution**: 
  1. Make sure images are uploaded as Assets
  2. Check that `images` field allows multiple assets
  3. Verify public read access for Assets

### Issue: Location data not working
- **Solution**: 
  1. Make sure `Location` is set as an embedded model
  2. Verify the field type is `Location` (not a relation)
  3. Check that latitude and longitude are Float type

## Next Steps

1. ✅ Create the schema as described above
2. ✅ Add sample properties with images and locations
3. ✅ Test the GraphQL queries in Hygraph's API Playground
4. ✅ Update your `.env.local` with your Hygraph endpoint and token
5. ✅ Run your app and verify properties load correctly

