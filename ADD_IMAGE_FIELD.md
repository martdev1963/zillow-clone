# How to Add the Image Field to Your Hygraph Property Model

## The Error
```
field 'image' is not defined in 'Property'
```

This means the `image` field doesn't exist in your Property model yet.

## Quick Fix Steps

### Step 1: Add the Image Field in Hygraph

1. Go to your Hygraph project
2. Navigate to **Schema** (left sidebar)
3. Find and click on the **Property** model
4. Click **Add Field** button
5. Configure the field:
   - **Field Name**: `image` (singular, lowercase)
   - **API ID**: `image` (should auto-fill)
   - **Type**: Select **Asset**
   - **Required**: Leave unchecked (optional)
   - **Allow multiple**: Leave unchecked (single image only for free tier)
   - **Allowed file types**: Select **Images only**
6. Click **Create**

### Step 2: Verify the Field

1. In the Property model, you should now see the `image` field listed
2. Make sure it's set to **Asset** type (not multiple)

### Step 3: Add Images to Your Properties

1. Go to **Content** in Hygraph
2. Click on a Property to edit it
3. In the `image` field, click to upload an image
4. Upload a property photo
5. **Important**: Click **Publish** (not just Save) - drafts won't show in the API

### Step 4: Test

1. Go to **API Playground** in Hygraph
2. Run this query:

```graphql
query TestQuery {
  properties {
    id
    name
    image {
      url
      fileName
    }
  }
}
```

If you see the image URL in the response, you're good to go!

### Step 5: Restart Your App

1. Restart your Next.js dev server
2. The images should now appear in your property cards

## Visual Guide

```
Hygraph Dashboard
├── Schema
│   └── Property (model)
│       ├── name ✓
│       ├── slug ✓
│       ├── beds ✓
│       ├── rentalPrice ✓
│       ├── description ✓
│       ├── image ← ADD THIS FIELD
│       └── location ✓
```

## Field Configuration Summary

| Setting | Value |
|---------|-------|
| Field Name | `image` |
| API ID | `image` |
| Type | **Asset** |
| Required | No (unchecked) |
| Allow multiple | No (unchecked) |
| File types | Images only |

## Troubleshooting

**"Field already exists"**
→ Check if you have a field named `images` (plural). If so, either:
- Rename it to `image` (singular), OR
- Update the code to use `images` instead

**"Cannot upload image"**
→ Make sure you're using the Asset field type, not a file upload field

**"Image not showing after adding field"**
→ Make sure you:
1. Published the properties (not just saved)
2. Restarted your dev server
3. The image URL is from `media.graphassets.com` domain

## After Adding the Field

Once you've added the `image` field and uploaded images to your properties:
1. ✅ The app will automatically start showing images
2. ✅ Property cards will display the images
3. ✅ Property detail pages will show the images

The code is already set up to handle the `image` field - you just need to add it to your Hygraph schema!

