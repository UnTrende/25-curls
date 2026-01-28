# Elite Doorstep Barber Services Web Application

A modern, SEO-optimized web application for freelance doorstep barber services targeting middle-class to high-end customers, with primary audience spanning Gen Z to 80-year-olds (including older men and boys).

## Features

- **Responsive Design**: Works seamlessly on all devices
- **SEO Optimized**: Built with best practices for search engine visibility
- **Booking System**: Online appointment scheduling with service selection
- **Customer Management**: User profiles and booking history
- **Service Portfolio**: Gallery of previous work and service descriptions
- **Age-Appropriate Services**: Specialized care for different age groups
- **Accessibility**: WCAG 2.1 AA compliant for all users

## Technology Stack

- **Frontend**: React 18 with Hooks
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Build Tool**: Vite
- **Deployment**: Static site (can be deployed to Netlify, Vercel, etc.)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx       # Navigation header
│   ├── Footer.jsx       # Site footer
│   ├── HeroSection.jsx  # Hero banner component
│   ├── ServicesPreview.jsx # Services preview
│   ├── PortfolioPreview.jsx # Portfolio preview
│   ├── TestimonialsPreview.jsx # Testimonials preview
│   └── CTASection.jsx   # Call-to-action component
├── pages/              # Route components
│   ├── Home.jsx        # Homepage
│   ├── Services.jsx    # Services page
│   ├── Booking.jsx     # Booking page
│   ├── Portfolio.jsx   # Portfolio page
│   ├── Testimonials.jsx # Testimonials page
│   └── Contact.jsx     # Contact page
├── styles/             # CSS files
│   └── index.css       # Main stylesheet
└── utils/              # Utility functions
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

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000` in your browser

## Deployment

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory and can be deployed to any static hosting service.

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