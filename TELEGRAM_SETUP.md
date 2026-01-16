# Telegram Notifications Setup Guide

Your website forms now send notifications to Telegram securely through edge functions. Follow this guide to activate the feature.

## Overview

The system works as follows:
1. **Frontend Forms** - Booking and Contact forms on your website
2. **Edge Functions** - Securely handle form submissions and send to Telegram
3. **Database** - Stores all submissions for your records
4. **Telegram Bot** - Sends real-time notifications to your Telegram group/chat

## Setup Instructions

### Step 1: Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Start a chat and send the command: `/newbot`
3. Follow the prompts:
   - Choose a name for your bot (e.g., "Speedboat Maldives")
   - Choose a username (must end in 'bot', e.g., "speedboat_maldives_bot")
4. BotFather will give you a **Bot Token** - save this, you'll need it later
   - Example: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`

### Step 2: Get Your Chat ID

You can send notifications to either:
- Your personal Telegram account
- A Telegram group or channel

#### For Personal Account:
1. Start a chat with your newly created bot
2. Send any message to the bot
3. Open this URL in your browser (replace TOKEN with your bot token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
4. Look for `"chat":{"id":` in the response - that's your chat ID
5. Example chat ID: `123456789`

#### For Group/Channel:
1. Create a Telegram group
2. Add your bot to the group as an administrator
3. Send a message in the group
4. Use the same URL as above to get updates
5. Look for the group's chat ID (it will be negative, like `-1001234567890`)

### Step 3: Configure Environment Variables

The Telegram bot token and chat ID need to be configured as environment variables in your Supabase project.

**Note:** These are configured in your Supabase dashboard, NOT in your frontend `.env` file.

The environment variables needed are:
- `TELEGRAM_BOT_TOKEN` - Your bot token from Step 1
- `TELEGRAM_CHAT_ID` - Your chat/group ID from Step 2

### Step 4: Test the Forms

1. Go to your website
2. Fill out either the Booking Form or Contact Form
3. Submit the form
4. You should receive a formatted notification in your Telegram chat/group

## Features

### Booking Form Notifications

When someone submits a booking, you'll receive:
- Route information (from/to locations)
- Date and time preferences
- Number of passengers
- Customer contact details (name, email, phone, WhatsApp)
- Additional notes or special requests

### Contact Form Notifications

When someone sends a message, you'll receive:
- Customer name
- Customer email
- Message content

### Database Records

All submissions are also stored in your Supabase database:
- **bookings** table - All booking requests with status tracking
- **contact_messages** table - All contact form messages

You can query these tables to:
- View submission history
- Track booking statuses
- Manage customer inquiries
- Generate reports

## Security Features

- Bot token is NEVER exposed in the frontend code
- All Telegram API calls happen server-side in edge functions
- Forms are protected by CORS headers
- Database uses Row Level Security (RLS) - no public access
- Only edge functions (using service role) can write to the database

## Troubleshooting

### Not receiving notifications?

1. Verify the bot token and chat ID are correct
2. Make sure the bot is not blocked
3. For groups, ensure the bot has admin rights
4. Check Supabase function logs for errors

### Getting "Telegram credentials not configured" error?

The environment variables are not set in your Supabase project. Follow Step 3 again.

### Forms submit but no Telegram message?

1. Check the edge function logs in Supabase
2. Verify your bot token hasn't expired
3. Test sending a message directly to the bot
4. Make sure the chat ID is correct (negative for groups)

### Bot was kicked from group?

If your bot is removed from the group:
1. Add it back as an administrator
2. The notifications will resume automatically

## Advanced: Group Permissions

For better organization in Telegram groups:
1. Create a dedicated channel or group for notifications
2. Pin important bookings
3. Use Telegram's threading feature to discuss specific bookings
4. Assign team members to handle different types of requests

## Database Queries

To view bookings in your Supabase dashboard:
```sql
SELECT * FROM bookings ORDER BY created_at DESC;
```

To view pending bookings:
```sql
SELECT * FROM bookings WHERE status = 'pending' ORDER BY date, time;
```

To view unread contact messages:
```sql
SELECT * FROM contact_messages WHERE status = 'unread' ORDER BY created_at DESC;
```

## Next Steps

After receiving notifications, you can:
1. Respond directly to customers via email or WhatsApp
2. Update booking status in the database
3. Mark contact messages as read/replied
4. Export data for reporting and analysis
