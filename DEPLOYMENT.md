# Deployment Guide

This guide covers deploying the Elite Doorstep Barber Services application to production.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account and project
- Vercel account (or alternative hosting)
- Stripe account
- Resend account (for emails)
- Twilio account (for SMS)
- Google Analytics account
- Sentry account (for error monitoring)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in all required values:

```bash
cp .env.example .env.local
```

### Required Variables:

1. **Supabase**
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `SUPABASE_SERVICE_KEY`: Service key for server-side operations

2. **Stripe**
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
   - `STRIPE_SECRET_KEY`: Stripe secret key

3. **Email (Resend)**
   - `RESEND_API_KEY`: Resend API key

4. **SMS (Twilio)**
   - `TWILIO_ACCOUNT_SID`: Twilio account SID
   - `TWILIO_AUTH_TOKEN`: Twilio auth token
   - `TWILIO_PHONE_NUMBER`: Your Twilio phone number

5. **Analytics**
   - `VITE_GA_TRACKING_ID`: Google Analytics tracking ID

6. **Error Monitoring (Sentry)**
   - `VITE_SENTRY_DSN`: Sentry DSN
   - `SENTRY_AUTH_TOKEN`: Sentry auth token
   - `SENTRY_ORG`: Sentry organization name
   - `SENTRY_PROJECT`: Sentry project name

## Supabase Setup

### 1. Create Project
```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref
```

### 2. Run Migrations
```bash
# Apply database migrations
supabase db push

# Run seed data (optional)
psql -h your-db-host -U postgres -d postgres -f supabase/seed.sql
```

### 3. Deploy Edge Functions
```bash
# Deploy payment intent function
supabase functions deploy create-payment-intent --no-verify-jwt

# Deploy email function
supabase functions deploy send-booking-email --no-verify-jwt

# Deploy SMS function
supabase functions deploy send-sms-reminder --no-verify-jwt
```

### 4. Set Function Secrets
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set RESEND_API_KEY=re_...
supabase secrets set TWILIO_ACCOUNT_SID=...
supabase secrets set TWILIO_AUTH_TOKEN=...
supabase secrets set TWILIO_PHONE_NUMBER=+1...
supabase secrets set SITE_URL=https://yourdomain.com
```

### 5. Create Storage Buckets
```sql
-- In Supabase SQL Editor
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('portfolio', 'portfolio', true),
  ('testimonials', 'testimonials', true);

-- Set bucket policies for public read, admin write
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');

CREATE POLICY "Admin upload access" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'portfolio' AND
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );
```

### 6. Create Admin User
```sql
-- After signing up through the app, promote to admin:
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin@email.com';
```

## Vercel Deployment

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login and Link Project
```bash
vercel login
vercel link
```

### 3. Set Environment Variables
```bash
# Add all environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_STRIPE_PUBLISHABLE_KEY
vercel env add VITE_GA_TRACKING_ID
vercel env add VITE_SENTRY_DSN
# ... add all other variables
```

### 4. Deploy
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## GitHub Actions Setup

### 1. Add Repository Secrets
Go to your GitHub repository → Settings → Secrets and add:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_GA_TRACKING_ID`
- `VITE_SENTRY_DSN`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`

### 2. Enable Workflows
The CI/CD pipeline will automatically:
- Run tests on PRs and pushes
- Build the application
- Deploy preview on PRs
- Deploy to production on main branch pushes
- Send deployment notifications to Sentry

## Google Analytics Setup

1. Create GA4 property at https://analytics.google.com
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables as `VITE_GA_TRACKING_ID`
4. Add Google Analytics script to `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Sentry Setup

1. Create project at https://sentry.io
2. Get your DSN
3. Add to environment variables
4. Source maps will be uploaded automatically on deployment

## Domain Configuration

### Vercel Custom Domain
1. Go to Vercel project settings
2. Add your custom domain
3. Configure DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Update Environment Variables
Update `SITE_URL` in Supabase function secrets and environment variables.

## Testing

### Run Tests Locally
```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

### Test Integrations
1. **Stripe**: Use test mode cards
2. **Email**: Check Resend dashboard
3. **SMS**: Check Twilio logs
4. **Analytics**: Use Google Analytics DebugView

## Monitoring

### Application Monitoring
- **Sentry**: Error tracking and performance monitoring
- **Vercel Analytics**: Core Web Vitals
- **Google Analytics**: User behavior

### Health Checks
Create a simple health check endpoint:
```bash
curl https://yourdomain.com/
```

## Rollback Procedure

### Vercel
```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote deployment-url
```

### Database
```bash
# Revert last migration
supabase db reset

# Apply specific migration
supabase db push --include-migrations migration-name
```

## Troubleshooting

### Build Failures
- Check environment variables are set
- Verify all dependencies are installed
- Check build logs in Vercel

### Function Errors
- Check Supabase function logs
- Verify secrets are set correctly
- Test locally with `supabase functions serve`

### Database Issues
- Check RLS policies
- Verify migrations are applied
- Check connection settings

## Security Checklist

- [ ] All API keys stored in environment variables
- [ ] RLS policies enabled on all tables
- [ ] HTTPS enforced
- [ ] CORS configured correctly
- [ ] Rate limiting configured
- [ ] Input validation on all forms
- [ ] Admin routes protected
- [ ] SQL injection prevention
- [ ] XSS protection enabled

## Performance Optimization

- [ ] Enable Vercel Edge Network
- [ ] Configure caching headers
- [ ] Optimize images (WebP format)
- [ ] Enable compression
- [ ] Implement code splitting
- [ ] Monitor Core Web Vitals

## Maintenance

### Regular Tasks
- Monitor error rates in Sentry
- Review analytics in GA
- Check Supabase database size
- Update dependencies monthly
- Review and optimize RLS policies
- Backup database weekly

### Updates
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## Support

For issues or questions:
- Email: admin@elitebarber.com
- Documentation: Check README.md and SUPABASE_SETUP.md
- Logs: Check Vercel and Supabase dashboards
