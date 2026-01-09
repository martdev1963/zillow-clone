# Hygraph Quick Start Guide

## TL;DR - Quick Setup Steps

### 1. Create Location Model (Embedded)
- **Name**: `Location`
- **Type**: Embedded
- **Fields**:
  - `latitude` (Float, Required)
  - `longitude` (Float, Required)

### 2. Create Property Model
- **Name**: `Property`
- **Type**: Standalone Model
- **Fields**:
  - `name` (Single line text, Required)
  - `slug` (Slug, Required, Unique, Based on: name)
  - `beds` (Integer, Required)
  - `rentalPrice` (Integer, Required)
  - `description` (Rich text, Optional)
  - `images` (Asset, Multiple, Optional)
  - `location` (Location - embedded, Required)

### 3. Set Permissions
- Go to **Settings** → **API Access**
- Enable **Public Content API** read access for:
  - ✅ Property
  - ✅ Location
  - ✅ Asset

### 4. Get Your API Credentials
1. Go to **Settings** → **API Access**
2. Copy your **Content API URL** → This is your `HYGRAPH_ENDPOINT`
3. Create a **Permanent Auth Token** → This is your `HYGRAPH_API_TOKEN`

### 5. Add to .env.local
```env
HYGRAPH_ENDPOINT=https://api-xxxxx.hygraph.com/v2/xxxxx/master
HYGRAPH_API_TOKEN=your_token_here
```

## Field Details

### Property Model Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | Single line text | ✅ | Property title |
| slug | Slug | ✅ | Auto-generate from name |
| beds | Integer | ✅ | Number of bedrooms |
| rentalPrice | Integer | ✅ | Monthly rent (no decimals) |
| description | Rich text | ❌ | Property details |
| images | Asset (multiple) | ❌ | Upload property photos |
| location | Location (embedded) | ✅ | Coordinates |

### Location Model Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| latitude | Float | ✅ | Decimal degrees |
| longitude | Float | ✅ | Decimal degrees |

## Sample Data Examples

### Property 1
```
Name: Palm Beach Apartment
Slug: palm-beach-apartment
Beds: 2
Rental Price: 2500
Description: Beautiful 2-bedroom apartment with ocean views.
Location:
  Latitude: 26.7056
  Longitude: -80.0364
Images: [Upload 2-3 photos]
```

### Property 2
```
Name: Downtown Miami Loft
Slug: downtown-miami-loft
Beds: 1
Rental Price: 1800
Description: Modern loft in the heart of downtown.
Location:
  Latitude: 25.7617
  Longitude: -80.1918
Images: [Upload 2-3 photos]
```

## Testing Your Schema

After setup, test in Hygraph's **API Playground**:

```graphql
query TestQuery {
  properties {
    id
    name
    slug
    beds
    rentalPrice
    location {
      latitude
      longitude
    }
    images {
      url
      fileName
    }
  }
}
```

If this works, your schema is set up correctly! 🎉

## Common Issues

**"Cannot query field 'properties'"**
→ Check model name is exactly `Property` (singular)

**Images not loading**
→ Verify `images` field allows multiple assets

**Location is null**
→ Make sure Location is embedded (not a relation)

**Slug not unique**
→ Enable unique constraint on slug field

