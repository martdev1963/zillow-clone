# Troubleshooting Guide

## HTTP 400 Error - GraphQL Query Issues

If you're getting a 400 error, it's usually because the GraphQL query doesn't match your Hygraph schema.

### Common Causes:

1. **Field Name Mismatch**
   - The query uses `image` but your Hygraph schema has `images` (or vice versa)
   - Check your Hygraph schema and make sure the field name matches

2. **Field Doesn't Exist**
   - The `image` field hasn't been created in your Property model
   - Go to Hygraph → Schema → Property model and add the field

3. **Model Name Mismatch**
   - The query uses `properties` but your model might be named differently
   - Hygraph automatically pluralizes model names, so `Property` becomes `properties`

### How to Fix:

#### Step 1: Check Your Hygraph Schema

1. Go to your Hygraph project
2. Navigate to **Schema**
3. Find the **Property** model
4. Check what the image field is named:
   - If it's `images` (plural) → You need to either:
     - Rename it to `image` in Hygraph, OR
     - Update the query in `app/page.js` to use `images` instead of `image`
   - If it's `image` (singular) → The query should work

#### Step 2: Test in Hygraph API Playground

1. Go to Hygraph → **API Playground**
2. Try this query:

```graphql
query TestQuery {
  properties {
    id
    name
    slug
  }
}
```

If this works, try adding the image field:

```graphql
query TestQuery {
  properties {
    id
    name
    slug
    image {
      url
      fileName
    }
  }
}
```

If you get an error like "Cannot query field 'image'", it means:
- The field doesn't exist, OR
- The field is named differently (maybe `images`)

#### Step 3: Check the Console Output

After the fix, check your terminal/console. You should now see:
- The actual GraphQL error message
- The full API response

This will tell you exactly what's wrong.

### Quick Fix Options:

**Option A: If your field is named `images` (plural)**
Update `app/page.js` line 35 to:
```javascript
images {
  fileName
  url
}
```
And line 103 to:
```javascript
image={property.images?.[0]}
```

**Option B: If your field is named `image` (singular)**
Make sure in Hygraph:
- Field name: `image` (not `images`)
- Type: Asset
- Allow multiple: **No** (unchecked)

### Still Not Working?

1. Check that your properties are **published** (not just saved as draft)
2. Verify your API token has read permissions
3. Check that the Property model has public read access enabled
4. Look at the console output - it will show the exact error message

