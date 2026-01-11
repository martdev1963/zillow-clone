# Fix: "field 'images' is not defined in 'Property'"

## The Error
Your deployed app is failing because the `images` field doesn't exist in your Hygraph Property model.

## Quick Fix (Temporary)

I've temporarily removed the `images` field from the query so your app works. The app will now load properties without images.

## Permanent Fix: Add Images Field to Hygraph

### Step 1: Go to Hygraph Schema

1. Log into your Hygraph account
2. Go to your project
3. Click **"Schema"** in the left sidebar
4. Find and click on the **"Property"** model

### Step 2: Add Images Field

1. Click **"Add Field"** button
2. Configure the field:
   - **Field Name**: `images` (plural, lowercase)
   - **API ID**: `images` (should auto-fill)
   - **Type**: Select **"Asset"**
   - **Required**: Leave **unchecked** (optional)
   - **Allow multiple**: Check this box ✅ (IMPORTANT!)
   - **Allowed file types**: Select **"Images only"**
3. Click **"Create"**

### Step 3: Verify the Field

- You should now see `images` in your Property model fields
- Make sure "Allow multiple" is checked/enabled

### Step 4: Add Images Back to Query

Once you've added the field in Hygraph, update `app/page.js`:

Find this section (around line 55-60):
```javascript
                query: `
                query PropertiesQuery {
                  properties {
                    beds
                    description
                    location {
```

Change it to:
```javascript
                query: `
                query PropertiesQuery {
                  properties {
                    beds
                    description
                    images {
                      fileName
                      url
                    }
                    location {
```

### Step 5: Upload Images to Properties

1. Go to **Content** in Hygraph
2. Edit each property
3. In the `images` field, upload property photos
4. **Publish** the properties (not just save)

### Step 6: Redeploy

1. Commit and push your changes to GitHub
2. Render will automatically redeploy
3. Images should now appear!

## Alternative: Use Single Image Field

If you prefer a single image field instead:

1. In Hygraph, create a field named `image` (singular)
2. Type: **Asset**
3. **Allow multiple**: Leave unchecked
4. Update the query to use `image` instead of `images`
5. Update the Card component to use `property.image` instead of `property.images?.[0]`

## Testing

After adding the field, test in Hygraph's API Playground:

```graphql
query TestQuery {
  properties {
    id
    name
    images {
      url
      fileName
    }
  }
}
```

If this works, your field is set up correctly!

## Current Status

✅ App works without images (temporary fix applied)
⏳ Add `images` field in Hygraph
⏳ Update query to include images
⏳ Upload images to properties
⏳ Redeploy

Your app is now working on Render.com, just without images until you add the field!

