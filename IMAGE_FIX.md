# Image Loading Fix - Single Image Field

## Issue
Images weren't loading because the free tier of Hygraph doesn't support multiple assets in a single field.

## Solution
Changed from `images` (multiple) to `image` (single) to work with the free tier.

## What You Need to Do in Hygraph

### 1. Update Your Property Model

1. Go to your Hygraph project → **Schema**
2. Find the **Property** model
3. Look for the `images` field (or create a new field if it doesn't exist)
4. **If you have an `images` field:**
   - Delete it or rename it to `image`
   - Set it to **Asset** type
   - Make sure **"Allow multiple"** is **DISABLED** (unchecked)
   
5. **If creating new:**
   - Add a new field named `image` (singular)
   - Type: **Asset**
   - Required: No
   - Allow multiple: **No** (unchecked)
   - Allowed file types: Images only

### 2. Update Your Properties

1. Go to **Content** in Hygraph
2. Edit each property
3. Upload **one image** per property in the `image` field
4. Make sure to **Publish** the properties (not just save as draft)

### 3. Verify the Fix

After updating, test in Hygraph's API Playground:

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

You should see the image URL in the response.

## Code Changes Made

✅ Updated GraphQL queries to use `image` instead of `images`
✅ Updated Card component to use single image
✅ Updated Property detail page to use single image
✅ Updated all documentation

## Notes

- **Free tier limitation**: Hygraph free tier only allows single asset fields
- **Future upgrade**: If you upgrade to a paid plan later, you can easily switch back to multiple images by:
  1. Changing `image` to `images` in Hygraph
  2. Enabling "Allow multiple"
  3. Updating the GraphQL queries back to `images` array
  4. Updating the code to handle arrays again

## Testing

After making these changes:
1. Restart your Next.js dev server
2. Check that images now appear in the property cards
3. Verify images load on property detail pages

If images still don't load:
- Check browser console for errors
- Verify image URLs in Network tab
- Ensure images are published (not drafts) in Hygraph
- Check that image domain matches `next.config.js` remotePatterns

