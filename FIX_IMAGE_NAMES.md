# Fix: Broken Images with .jpg.jpg Extension

## The Problem

Your images show as broken icons because:
1. **Images are stored in Hygraph**, not in your git repository
2. The filenames in Hygraph still have `.jpg.jpg` (double extension)
3. Renaming files locally doesn't affect Hygraph assets

## The Solution

You need to update the image filenames **in Hygraph**, not in your local files.

## Step-by-Step Fix

### Option 1: Re-upload Images with Correct Names (Recommended)

1. **Go to Hygraph → Content**
2. **Edit each property** that has broken images
3. **In the `images` field:**
   - Remove the old images (with `.jpg.jpg` names)
   - Upload the images again with correct filenames (just `.jpg`)
4. **Publish** the properties
5. **Redeploy** your app (or wait for auto-deploy)

### Option 2: Update Filenames in Hygraph (If Supported)

Some Hygraph plans allow renaming assets:

1. **Go to Hygraph → Assets** (or Media Library)
2. **Find the images** with `.jpg.jpg` extension
3. **Rename them** to remove the duplicate extension
4. **Update properties** to use the renamed assets
5. **Publish** and redeploy

### Option 3: Use Image URLs Directly (Temporary Workaround)

If you can't rename in Hygraph, you could update the code to handle the `.jpg.jpg` extension, but this is not recommended as it's a workaround.

## Why This Happened

- **Images are stored in Hygraph's CDN** (not in your git repo)
- The `img` folder in your repo is **not used** by the app
- The app fetches image URLs from Hygraph's GraphQL API
- Those URLs point to assets stored in Hygraph's storage

## Verify the Fix

After updating images in Hygraph:

1. **Check the image URLs** in your browser's Network tab
2. **Verify filenames** don't have `.jpg.jpg`
3. **Test in Hygraph API Playground:**
   ```graphql
   query {
     properties {
       images {
         fileName
         url
       }
     }
   }
   ```
4. **Check that `fileName` shows correct names** (e.g., `downtown-1_v2.jpg` not `downtown-1_v2.jpg.jpg`)

## Important Notes

- **Local `img` folder**: The images in your `zillow-clone/img/` folder are **not used** by the deployed app
- **Hygraph is the source**: All images come from Hygraph's CDN
- **Git commits don't affect images**: Committing renamed files to git won't fix broken images
- **Publish required**: After updating images in Hygraph, make sure to **Publish** (not just Save)

## Quick Checklist

- [ ] Go to Hygraph → Content
- [ ] Edit each property
- [ ] Remove old images (with `.jpg.jpg`)
- [ ] Upload images with correct filenames (`.jpg` only)
- [ ] Publish properties
- [ ] Wait for Render to redeploy (or trigger manually)
- [ ] Verify images load correctly

After these steps, your images should display correctly! 🎉

