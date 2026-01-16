# Speedboat Maldives - Project Outline

## Project Overview

A fully responsive, SEO-optimized landing page for a Speed Boat Transfer Service in Maldives, serving Malé Atoll and Velana International Airport. Built with React, TypeScript, and Tailwind CSS.

---

## Installation Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A code editor (VS Code recommended)

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required dependencies including:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- Supabase client

### Step 2: Environment Setup (Optional)

The booking form and contact form can send submissions to Telegram. To enable this:

1. **Create a Telegram Bot**
   - Open Telegram and search for [@BotFather](https://t.me/BotFather)
   - Send `/newbot` and follow the instructions
   - Copy the bot token provided

2. **Get Your Chat ID**
   - Start a chat with your new bot
   - Search for [@userinfobot](https://t.me/userinfobot) on Telegram
   - Start a chat and it will send you your chat ID

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and add your credentials:
     ```
     VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
     VITE_TELEGRAM_CHAT_ID=your_chat_id_here
     ```

**Note**: The forms will work without Telegram configuration, but submissions won't be sent anywhere.

### Step 3: Run Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 4: Build for Production

To create a production-ready build:

```bash
npm run build
```

The build files will be generated in the `dist/` directory.

### Step 5: Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
speedboat-maldives/
├── public/
│   ├── robots.txt           # Search engine crawl directives
│   └── sitemap.xml          # SEO sitemap
├── src/
│   ├── components/
│   │   ├── Navigation.tsx   # Sticky header with mobile menu
│   │   ├── Hero.tsx         # Hero section with animated map
│   │   ├── MaldivesMap.tsx  # Interactive route map
│   │   ├── Destinations.tsx # Island destination cards
│   │   ├── BookingForm.tsx  # Booking request form
│   │   ├── Contact.tsx      # Contact section & form
│   │   ├── Footer.tsx       # Footer with links
│   │   ├── Button.tsx       # Reusable button component
│   │   ├── Card.tsx         # Reusable card component
│   │   ├── Input.tsx        # Form input component
│   │   ├── Select.tsx       # Form select component
│   │   └── Textarea.tsx     # Form textarea component
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles & Tailwind
├── index.html               # HTML with SEO meta tags
├── .env.example             # Environment variables template
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── README.md                # Project documentation
```

---

## Key Features

### SEO Optimization
- ✅ Semantic HTML5 structure
- ✅ Target keywords: speedboat maldives, travel maldives, speed boat transfer
- ✅ Comprehensive meta tags (SEO, Open Graph, Twitter Card)
- ✅ Schema.org structured data (TravelAgency)
- ✅ XML sitemap for search engines
- ✅ Robots.txt for crawl directives
- ✅ Mobile-first responsive design

### Interactive Components
- ✅ Animated map showing routes from Velana Airport
- ✅ Smooth scroll navigation
- ✅ Mobile hamburger menu
- ✅ WhatsApp integration (one-click messaging)
- ✅ Form submissions via Telegram Bot API

### Pages & Sections
1. **Navigation** - Sticky header with smooth scroll
2. **Hero** - H1 heading, CTAs, animated route map
3. **Destinations** - 6 popular islands with details
4. **Booking Form** - Manual route entry, date/time, passenger info
5. **Contact** - Multiple contact methods, contact form
6. **Footer** - Quick links, social media, popular routes

---

## Customization Guide

### Update Contact Information

**Phone Number**: `+960 777 8899`
- Update in: `src/components/Navigation.tsx`
- Update in: `src/components/Contact.tsx`

**WhatsApp Number**:
- Update WhatsApp links in `Navigation.tsx` (line ~28)
- Update in `Contact.tsx` (line ~101)

**Email**: `info@speedboatmaldives.com`
- Update in `src/components/Contact.tsx`
- Update in `index.html` (Schema.org markup)

### Update Domain/URLs

Before deploying, replace `speedboatmaldives.com` with your actual domain:

1. `index.html` - Canonical URL, Open Graph URLs
2. `public/sitemap.xml` - All URL entries
3. `public/robots.txt` - Sitemap location

### Add/Modify Destinations

Edit `src/components/Destinations.tsx`:
- Update the `destinations` array (lines 7-50)
- Add new islands with name, distance, duration, description, highlights

### Change Color Scheme

The design uses blue/ocean theme. To change:

**Primary Color**: `blue-600` → Change to your color
**Secondary Color**: `emerald-500` → Change to your color

Update Tailwind classes throughout components.

---

## Available Scripts

### `npm run dev`
Starts the development server at `http://localhost:5173`

### `npm run build`
Creates production build in `dist/` directory

### `npm run preview`
Previews the production build locally

### `npm run lint`
Runs ESLint to check code quality

### `npm run typecheck`
Runs TypeScript type checking

---

## Deployment

### Option 1: Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Option 2: Vercel
1. Import your GitHub repository
2. Vercel auto-detects Vite configuration
3. Add environment variables in project settings

### Option 3: Traditional Hosting
1. Run `npm run build`
2. Upload contents of `dist/` folder to your web server
3. Configure web server to serve `index.html` for all routes

**Important**: Remember to update domain URLs in sitemap.xml and robots.txt after deployment.

---

## SEO Checklist

After deployment:

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt is accessible
- [ ] Test Open Graph tags with Facebook Debugger
- [ ] Test Twitter Card with Twitter Card Validator
- [ ] Check mobile responsiveness with Google Mobile-Friendly Test
- [ ] Run Lighthouse audit for Performance & SEO scores
- [ ] Set up Google Analytics (optional)
- [ ] Register with Google My Business (if applicable)

---

## Technical Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Form Delivery**: Telegram Bot API
- **Database**: Supabase (available but not used in MVP)

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Features

- Optimized SVG illustrations (no external images)
- Lazy loading for images
- Minimal JavaScript bundle (~185 KB gzipped)
- Fast page load times
- Mobile-first responsive design
- CSS optimized with Tailwind purge

---

## Support & Maintenance

### Updating Dependencies

Check for outdated packages:
```bash
npm outdated
```

Update all packages:
```bash
npm update
```

Update specific package:
```bash
npm update package-name
```

### Common Issues

**Port already in use**:
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill
```

**Build errors**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**:
```bash
# Run type check to see all errors
npm run typecheck
```

---

## License

All rights reserved.

---

## Contact

For questions about this project, please contact the development team.
