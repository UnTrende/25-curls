# EliteCuts - Doorstep Barber Services Web Application

A modern, full-stack web application for freelance doorstep barber services with complete booking management, admin dashboard, and customer portal. Built with React, Supabase, and Tailwind CSS.

## ✨ Features

### Customer Portal
- **Responsive Design**: Seamless experience on all devices
- **Service Catalog**: Browse all available barber services with pricing
- **Online Booking System**: Real-time appointment scheduling
- **Service Portfolio**: Gallery showcasing previous work
- **Customer Testimonials**: Read reviews from satisfied customers
- **Age-Appropriate Services**: Specialized care for all age groups (Children to Seniors)
- **Contact Form**: Direct communication with the service provider
- **SEO Optimized**: Built with best practices for search visibility

### Admin Dashboard
- **Booking Management**: View, update, and manage all appointments
- **Booking Details Modal**: Comprehensive view of customer and booking information
- **Service Management**: Add, edit, and delete services
- **Portfolio Management**: Upload and manage gallery images
- **Testimonials Management**: Review and approve customer testimonials
- **Message Center**: View and respond to contact form submissions
- **Settings Management**: Configure site settings and social links
- **Status Updates**: Change booking status (Pending → Confirmed → Completed)

### Authentication & Security
- **Admin Authentication**: Secure login with Supabase Auth
- **Protected Routes**: Admin pages accessible only to authenticated users
- **Row Level Security (RLS)**: Database-level security policies
- **Error Tracking**: Integrated Sentry for error monitoring

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + Custom Components
- **Animations**: Framer Motion
- **Icons**: Iconify React
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Build Tool**: Vite
- **Error Tracking**: Sentry
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel/Netlify ready

## 📁 Project Structure

```
src/
├── api/                    # API integration layer
│   ├── bookings.js         # Booking CRUD operations
│   ├── services.js         # Services management
│   ├── testimonials.js     # Testimonials management
│   ├── portfolio.js        # Portfolio management
│   ├── contact.js          # Contact form handling
│   └── notifications.js    # Notification system
├── components/             # Reusable UI components
│   ├── Navbar.jsx          # Main navigation
│   ├── Footer.jsx          # Site footer
│   ├── HeroSection.jsx     # Hero banner
│   ├── AnimatedGradient.jsx # Background animation
│   ├── ProtectedRoute.jsx  # Auth route wrapper
│   ├── admin/              # Admin-specific components
│   │   ├── AdminLayout.jsx # Admin dashboard layout
│   │   ├── BookingDetailsModal.jsx # Booking details popup
│   │   ├── StatusBadge.jsx # Status indicator
│   │   └── ConfirmDialog.jsx # Confirmation dialog
│   └── ui/                 # UI components
│       └── LiveButton.jsx  # Animated button
├── pages/                  # Route components
│   ├── Home.jsx            # Homepage
│   ├── Services.jsx        # Services catalog
│   ├── Booking.jsx         # Booking form
│   ├── Portfolio.jsx       # Work gallery
│   ├── Testimonials.jsx    # Customer reviews
│   ├── Contact.jsx         # Contact form
│   ├── AdminLogin.jsx      # Admin authentication
│   ├── AdminDashboard.jsx  # Admin overview
│   └── admin/              # Admin management pages
│       ├── ManageBookings.jsx
│       ├── ManageServices.jsx
│       ├── ManagePortfolio.jsx
│       ├── ManageTestimonials.jsx
│       ├── ManageMessages.jsx
│       └── ManageSettings.jsx
├── hooks/                  # Custom React hooks
│   └── useAuth.jsx         # Authentication hook
├── lib/                    # Utilities and configs
│   ├── supabaseClient.js   # Supabase setup
│   ├── sentry.js           # Error tracking
│   └── utils.js            # Helper functions
├── styles/                 # CSS files
│   ├── index.css           # Global styles
│   └── AnimatedGradient.css # Animation styles
└── utils/                  # Utility functions
    ├── analytics.js        # Analytics tracking
    └── webVitals.js        # Performance monitoring
```

## SEO Features

- Semantic HTML structure
- Proper heading hierarchy (H1, H2, H3)
- Meta tags and descriptions
- Schema markup for local business
- Image alt attributes
- Clean URL structure
- Fast loading times
- Mobile responsiveness

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Supabase account (for database and authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd barber-services-webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```
   
   Required environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_SENTRY_DSN=your_sentry_dsn (optional)
   ```

4. **Set up Supabase database**
   
   Run the migration script in your Supabase SQL Editor:
   ```bash
   # File: supabase/migrations/20260129_initial_schema.sql
   ```
   
   See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.

5. **Create an admin user**
   
   Follow the steps in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to create your first admin account.

6. **Start the development server**
   ```bash
   npm run dev
   ```
   
7. **Open your browser**
   
   Visit `http://localhost:3000`

### Admin Access

- **Admin Login**: `http://localhost:3000/admin/login`
- **Admin Dashboard**: `http://localhost:3000/admin/dashboard`

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory and can be deployed to any static hosting service.

## 🚢 Deployment

This project is ready to deploy to:
- **Vercel**: One-click deployment
- **Netlify**: Drag & drop or Git integration
- **Any static host**: Upload the `dist/` folder

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Accessibility

This application follows WCAG 2.1 AA guidelines:
- Proper semantic HTML
- Sufficient color contrast
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators
- Alt text for images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)