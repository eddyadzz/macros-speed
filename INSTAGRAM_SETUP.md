# Instagram Feed Setup Guide

Your website now displays live Instagram posts! To activate this feature, you need to set up Instagram API access.

## Quick Overview

The system works in three parts:
1. **Database** - Stores your Instagram posts locally for fast loading
2. **Edge Function** - Fetches new posts from Instagram API periodically
3. **Frontend** - Displays your latest posts beautifully on the website

## Setup Instructions

### Step 1: Get Instagram Access Token

You need an Instagram access token to fetch posts from your Instagram account.

#### Option A: Instagram Basic Display API (Recommended for personal accounts)

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or use an existing one
3. Add "Instagram Basic Display" product
4. Configure Instagram Basic Display:
   - Add your Instagram account as a test user
   - Generate an access token
5. Copy the access token

#### Option B: Instagram Graph API (For business accounts)

1. Convert your Instagram account to a Business or Creator account
2. Connect it to a Facebook Page
3. Use [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
4. Generate a User Access Token with `instagram_basic` and `pages_read_engagement` permissions
5. Exchange it for a long-lived token (60 days)

### Step 2: Configure Environment Variable

The Instagram access token needs to be configured as an environment variable in your Supabase project.

**Note:** This is configured automatically in your Supabase dashboard. You just need to provide the token value when you're ready to activate the feature.

The environment variable name is: `INSTAGRAM_ACCESS_TOKEN`

### Step 3: Sync Your Instagram Posts

Once configured, you can manually sync your Instagram posts by calling the edge function:

```bash
curl -X POST https://[YOUR-PROJECT-REF].supabase.co/functions/v1/sync-instagram-posts \
  -H "Authorization: Bearer [YOUR-SUPABASE-ANON-KEY]"
```

Or set up a scheduled job to sync posts automatically (e.g., every hour or daily).

### Step 4: Automate Syncing (Optional)

To keep your feed updated automatically, you can:

1. **Use Supabase Edge Function Cron Jobs** (if available)
2. **Use external cron services** like:
   - GitHub Actions with scheduled workflows
   - Cron-job.org
   - EasyCron
   - Your own server with cron

Example GitHub Actions workflow (`.github/workflows/sync-instagram.yml`):

```yaml
name: Sync Instagram Posts

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:  # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Sync Instagram Posts
        run: |
          curl -X POST ${{ secrets.SUPABASE_URL }}/functions/v1/sync-instagram-posts \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}"
```

## What Happens Now?

- **Before setup**: The Instagram section shows a placeholder with a "Follow" button
- **After setup**: Your latest Instagram post appears as a featured image, with 5 more recent posts shown as thumbnails below
- **Automatic updates**: Posts refresh based on your sync schedule
- **Performance**: Posts load instantly from your database (no Instagram API calls on page load)
- **Video support**: Video posts show with a play button indicator

## Features

- Displays latest Instagram post as a hero image
- Shows 5 additional recent posts as thumbnails
- Supports both photos and videos
- Captions shown on hover
- Direct links to Instagram posts
- Responsive design
- Loading states
- Graceful fallback if no posts available

## Troubleshooting

### No posts showing up?

1. Check that `INSTAGRAM_ACCESS_TOKEN` is configured
2. Verify the token is valid and not expired
3. Call the sync function manually to fetch posts
4. Check browser console for error messages
5. Verify your Instagram account has public posts

### Token expired?

Instagram tokens expire periodically. You'll need to:
1. Generate a new token following the same steps
2. Update the environment variable
3. Sync posts again

## API Rate Limits

- Instagram Basic Display API: 200 requests per hour
- The sync function is designed to be called infrequently (hourly or daily)
- Posts are cached in your database for instant loading

## Need Help?

If you encounter any issues, check:
- Supabase function logs for error messages
- Browser console for frontend errors
- Instagram API documentation for token issues
