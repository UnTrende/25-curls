# Supabase Backend Setup

This project uses Supabase for backend services including database, authentication, and storage.

## Environment Variables

The following environment variables are required in `.env.local`:

```env
VITE_SUPABASE_URL=https://teituxzuutzxqghkouyd.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Database Schema

The database includes 8 tables:
- `profiles` - User profiles with role-based access
- `services` - Service catalog
- `bookings` - Appointment management
- `testimonials` - Customer reviews
- `portfolio_items` - Gallery items
- `contact_messages` - Contact form submissions
- `site_settings` - Site configuration
- `social_links` - Social media links

## Migrations

All migrations are located in `supabase/migrations/`:
- `20260129_initial_schema.sql` - Initial database schema with RLS policies

## Seed Data

Initial data can be loaded using `supabase/seed.sql`:
- 6 services
- 6 testimonials
- Site settings
- 4 social media links

## Creating an Admin User

To create an admin user:

1. Sign up through the Supabase dashboard or authentication
2. Update the user's role in the database:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin@email.com';
```

## API Modules

All API functions are in `src/api/`:
- `services.js` - Service management
- `bookings.js` - Booking operations
- `testimonials.js` - Testimonial management
- `contact.js` - Contact messages
- `portfolio.js` - Portfolio management
- `siteSettings.js` - Site settings
- `socialLinks.js` - Social media links

## Authentication

Admin authentication is handled through:
- `src/hooks/useAuth.js` - Authentication hook
- `src/components/ProtectedRoute.jsx` - Route protection
- `src/pages/AdminLogin.jsx` - Login page

## Storage Buckets

The following storage buckets should be created in Supabase:
- `portfolio` - Portfolio images
- `testimonials` - Testimonial images

Configure bucket policies for public read access and admin-only write access.
