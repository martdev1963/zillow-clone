# Fixing 404 Error on Property Detail Pages

## The Issue
Clicking on a property card shows a 404 error instead of the property detail page.

## What I Fixed

1. **Next.js 14 Params Handling** - Updated to await params (Next.js 14+ requirement)
2. **Better Error Logging** - Added console logs to see what's failing
3. **Added NavBar** - For consistent layout

## Debugging Steps

### Step 1: Check the Console

When you click a property card, check your terminal/console for error messages. You should see:
- The slug being queried
- Any GraphQL errors
- The API response

### Step 2: Test the GraphQL Query

Go to Hygraph → **API Playground** and test this query:

```graphql
query PropertyQuery($slug: String!) {
  property(where: { slug: $slug }) {
    beds
    description
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

**Variables:**
```json
{
  "slug": "palm-beach-apartment"
}
```

### Step 3: Common Issues

#### Issue 1: Query Syntax Wrong
If you get an error like "Cannot query field 'property'", Hygraph might use a different query format.

**Try this alternative:**
```graphql
query PropertyQuery($slug: String!) {
  properties(where: { slug: $slug }) {
    beds
    name
    rentalPrice
    slug
    id
  }
}
```

Then update `app/property/[slug]/page.js` line 23 to:
```javascript
properties(where: { slug: $slug }) {
```

And line 53 to:
```javascript
if (!json.data?.properties || json.data.properties.length === 0) {
```

And line 58 to:
```javascript
return json.data.properties[0]
```

#### Issue 2: Slug Field Not Unique
If the slug field isn't set as unique in Hygraph, the query might fail.

**Fix:** Go to Hygraph → Schema → Property model → slug field → Enable "Unique"

#### Issue 3: Property Not Published
If the property is saved as a draft, it won't appear in the API.

**Fix:** Go to Hygraph → Content → Edit property → Click **Publish** (not just Save)

#### Issue 4: Wrong Slug Format
Check that the slug in your property matches exactly (case-sensitive, no extra spaces).

**Fix:** 
1. Check the slug in Hygraph
2. Check what slug is being passed in the URL
3. Make sure they match exactly

## Quick Test

1. Restart your dev server
2. Click on a property card
3. Check the terminal for error messages
4. The error message will tell you exactly what's wrong

## Expected Console Output

If working correctly, you should see:
```
Property not found for slug: palm-beach-apartment
```

Or if the query succeeds, you should see the property data.

## Still Not Working?

Share the console error message and I can help fix it specifically!

