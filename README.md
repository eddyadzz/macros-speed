# Speedboat Maldives - Landing Page

A fully responsive, SEO-optimized landing page for a Speed Boat Transfer Service in Maldives, serving Malé Atoll and Velana International Airport.

## Features

### SEO Optimization
- **Semantic HTML5** structure with proper heading hierarchy
- **Target Keywords**: speedboat maldives, speed boat transfer maldives, travel maldives
- **Meta Tags**: Comprehensive SEO meta tags, Open Graph, and Twitter Card tags
- **Schema.org Markup**: Structured data for travel agency
- **Sitemap.xml**: XML sitemap for search engine crawling
- **Robots.txt**: Search engine crawl directives
- **Mobile-First Design**: Optimized for all devices

### Key Sections

1. **Navigation**
   - Sticky header with smooth scroll
   - Mobile hamburger menu
   - WhatsApp quick access button
   - Responsive design

2. **Hero Section**
   - Keyword-optimized H1 heading
   - Animated interactive map showing routes from Velana Airport
   - Clear call-to-action buttons
   - Feature highlights

3. **Popular Destinations**
   - SEO-rich content cards for 6 popular islands
   - Distance and travel time information
   - Destination highlights
   - Optimized image alt texts

4. **Booking Form**
   - Comprehensive booking request form
   - Telegram Bot integration for instant notifications
   - Form validation
   - Success/error feedback

5. **Contact Section**
   - Multiple contact methods (WhatsApp, Phone, Email)
   - Contact form with Telegram delivery
   - Service area information

6. **Footer**
   - Quick links navigation
   - Social media links
   - Popular routes
   - Additional SEO keyword placement

### Interactive Features

- **Animated Map**: Real-time route visualization from Velana Airport to islands
- **Smooth Scrolling**: Single-page navigation experience
- **Mobile-Optimized**: Touch-friendly buttons and forms
- **WhatsApp Integration**: One-click messaging
- **Form Submissions**: Telegram Bot notifications

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Telegram Bot API** for form submissions

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Telegram Bot (Optional)**

   To receive booking requests via Telegram:

   - Create a bot via [@BotFather](https://t.me/BotFather) on Telegram
   - Get your bot token
   - Start a chat with your bot
   - Get your chat ID (use [@userinfobot](https://t.me/userinfobot))
   - Copy `.env.example` to `.env`
   - Add your credentials:
     ```
     VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
     VITE_TELEGRAM_CHAT_ID=your_chat_id_here
     ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## SEO Details

### Primary Keywords
- speedboat maldives
- speed boat transfer maldives
- travel maldives

### Secondary Keywords
- maldives airport transfer
- male atoll speedboat
- velana airport speedboat
- airport to island transfer

### Meta Information
- **Title**: Speedboat Maldives | Fast Airport & Island Transfers (60 chars)
- **Description**: Reliable speedboat transfers in Maldives. Airport to island travel in Malé Atoll. Book fast, safe, and comfortable rides. (159 chars)

### Sitemap & SEO Files

The project includes essential SEO files for search engine optimization:

**sitemap.xml** (`public/sitemap.xml`)
- Lists all important pages and sections of the website
- Includes main page and anchor links (#home, #destinations, #booking, #contact)
- Specifies update frequency and priority for each URL
- Accessible at: `https://speedboatmaldives.com/sitemap.xml`

**robots.txt** (`public/robots.txt`)
- Provides crawling instructions for search engines
- References the sitemap location
- Allows all search engines to index the site
- Accessible at: `https://speedboatmaldives.com/robots.txt`

**Important**: When deploying, update the domain in both files from `speedboatmaldives.com` to your actual domain name.

## Customization

### Contact Information
Update the following in the codebase:
- Phone: `+960 777 8899` (in Navigation, Contact components)
- WhatsApp: Update the number in WhatsApp links
- Email: `info@speedboatmaldives.com`

### Destinations
Edit `src/components/Destinations.tsx` to add/modify island destinations.

### Colors
The design uses a blue color scheme for ocean theme. Modify Tailwind classes to change:
- Primary: `blue-600`
- Secondary: `emerald-500`
- Accents: Various ocean-inspired colors

## Performance

- Optimized images (SVG illustrations for destinations)
- Lazy loading for images
- Minimal JavaScript bundle
- Fast page load times
- Mobile-first responsive design

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive across all screen sizes

## License

All rights reserved.
