# 🚀 Quick Start Guide

## Current Status

✅ **Application is running!** Visit: http://localhost:3000

### What's Working Now:
- ✅ Homepage with hero section, services preview, portfolio preview
- ✅ Services page
- ✅ Portfolio page (demo mode with fallback data)
- ✅ Testimonials page
- ✅ Contact page
- ✅ All styling and animations
- ✅ Responsive design

### What Needs Configuration:
- ⚠️ Booking system (requires Supabase)
- ⚠️ Admin dashboard (requires Supabase + authentication)
- ⚠️ Payment processing (requires Stripe)
- ⚠️ Email notifications (requires Resend)
- ⚠️ SMS reminders (requires Twilio)

---

## 🔧 Enable Full Functionality

### Step 1: Setup Supabase (Required for core features)

1. **Create a Supabase account**: https://supabase.com

2. **Create a new project**

3. **Get your credentials**:
   - Go to Project Settings → API
   - Copy `Project URL` (VITE_SUPABASE_URL)
   - Copy `anon/public` key (VITE_SUPABASE_ANON_KEY)

4. **Update .env.local**:
```bash
# Replace placeholder values with real ones:
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

5. **Run database migrations**:
```bash
# Install Supabase CLI
npm install -g supabase

# Login and link project
supabase login
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

6. **Run seed data** (optional):
```bash
psql -h db.yourproject.supabase.co -U postgres -d postgres -f supabase/seed.sql
```

7. **Create your admin user**:
   - Sign up through the app at http://localhost:3000/admin/login
   - Then run this SQL in Supabase SQL Editor:
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

8. **Restart the dev server**:
```bash
npm run dev
```

---

### Step 2: Setup Payment Processing (Optional)

1. **Create Stripe account**: https://stripe.com

2. **Get test keys**:
   - Dashboard → Developers → API keys
   - Copy "Publishable key" (starts with `pk_test_`)
   - Copy "Secret key" (starts with `sk_test_`)

3. **Add to .env.local**:
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-key-here
```

4. **Add to Supabase Edge Function secrets**:
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_your-secret-key
```

5. **Deploy payment Edge Function**:
```bash
supabase functions deploy create-payment-intent
```

---

### Step 3: Setup Email Notifications (Optional)

1. **Create Resend account**: https://resend.com

2. **Get API key**:
   - Dashboard → API Keys → Create API Key

3. **Add to Supabase secrets**:
```bash
supabase secrets set RESEND_API_KEY=re_your-api-key
supabase secrets set SITE_URL=http://localhost:3000
```

4. **Deploy email Edge Function**:
```bash
supabase functions deploy send-booking-email
```

---

### Step 4: Setup SMS Reminders (Optional)

1. **Create Twilio account**: https://twilio.com

2. **Get credentials**:
   - Console → Account Info
   - Copy Account SID
   - Copy Auth Token
   - Get a phone number

3. **Add to Supabase secrets**:
```bash
supabase secrets set TWILIO_ACCOUNT_SID=your-account-sid
supabase secrets set TWILIO_AUTH_TOKEN=your-auth-token
supabase secrets set TWILIO_PHONE_NUMBER=+1234567890
```

4. **Deploy SMS Edge Function**:
```bash
supabase functions deploy send-sms-reminder
```

---

### Step 5: Setup Analytics (Optional)

1. **Create Google Analytics property**: https://analytics.google.com

2. **Get Measurement ID** (format: G-XXXXXXXXXX)

3. **Add to .env.local**:
```bash
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

4. **Add to index.html** (already there, just uncomment):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

---

### Step 6: Setup Error Monitoring (Optional)

1. **Create Sentry account**: https://sentry.io

2. **Create new project** (select React)

3. **Get DSN**

4. **Add to .env.local**:
```bash
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

---

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

### Test Features

1. **Homepage**: http://localhost:3000
2. **Services**: http://localhost:3000/services
3. **Portfolio**: http://localhost:3000/portfolio
4. **Booking**: http://localhost:3000/booking (needs Supabase)
5. **Admin Login**: http://localhost:3000/admin/login (needs Supabase)
6. **Admin Dashboard**: http://localhost:3000/admin/dashboard (needs Supabase + admin role)

---

## 🚀 Deployment

Once everything is configured and tested locally:

1. **Push to GitHub**:
```bash
git add .
git commit -m "Add all new features"
git push origin main
```

2. **Deploy to Vercel**:
```bash
vercel --prod
```

3. **Add environment variables in Vercel**:
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all variables from .env.local

4. **Setup GitHub Actions**:
   - Add repository secrets (see DEPLOYMENT.md)
   - Workflows will run automatically on push

---

## 📚 Documentation

- **README.md** - Project overview
- **DEPLOYMENT.md** - Complete deployment guide
- **IMPLEMENTATION_SUMMARY.md** - All features breakdown
- **SUPABASE_SETUP.md** - Database setup details
- **.env.example** - All environment variables template

---

## 🆘 Troubleshooting

### White Screen
- ✅ **Fixed!** App now runs in demo mode without Supabase
- Check browser console for errors (F12)
- Verify .env.local exists and has correct format

### "Supabase not initialized" errors
- This is expected if you haven't configured Supabase yet
- Add real credentials to .env.local
- Restart dev server

### Database errors
- Make sure migrations are applied: `supabase db push`
- Check RLS policies are enabled
- Verify you have an admin user

### Payment not working
- Use Stripe test cards: 4242 4242 4242 4242
- Check Edge Function is deployed
- Verify STRIPE_SECRET_KEY is set in Supabase secrets

### Emails not sending
- Check Resend dashboard for delivery status
- Verify RESEND_API_KEY in Supabase secrets
- Check Edge Function logs: `supabase functions logs send-booking-email`

---

## 📞 Support

For detailed setup instructions, see **DEPLOYMENT.md**

**Ready to go live?** Follow the complete deployment checklist in DEPLOYMENT.md!
