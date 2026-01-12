# Ayyapanthangal Marathon 2026 - Frontend

A modern, single-page React application for the Ayyapanthangal Marathon 2026 event, built with Vite, Tailwind CSS, and Framer Motion.

## Features

- **Single-Page Application** with smooth scroll navigation
- **Responsive Design** - Works on all devices
- **Framer Motion Animations** - Smooth scroll-triggered animations
- **Event Information** - Complete event details, registration, and sponsorship information
- **Registration Form** - Interactive registration form with validation
- **Sponsorship Section** - Detailed sponsorship opportunities and tiers

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.jsx          # Navigation header with smooth scroll
│   │   └── Footer.jsx          # Footer component
│   ├── sections/               # Page sections
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── EventDetails.jsx
│   │   ├── Objectives.jsx
│   │   ├── ParticipantProfile.jsx
│   │   ├── Registration.jsx
│   │   ├── Sponsorship.jsx
│   │   ├── CategorySponsors.jsx
│   │   ├── LocalPartners.jsx
│   │   ├── InKindSponsors.jsx
│   │   ├── WhyPartner.jsx
│   │   ├── PostEvent.jsx
│   │   └── Contact.jsx
│   └── common/                 # Reusable components
│       ├── Button.jsx
│       ├── Card.jsx
│       └── SponsorshipCard.jsx
├── animations/
│   └── variants.js             # Framer Motion animation variants
├── styles/
│   └── index.css               # Tailwind CSS imports
├── App.jsx                     # Main app component
└── main.jsx                    # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Event Information

- **Date:** Sunday, 15 February 2026
- **Venue:** Ayyapanthangal
- **Race Categories:** 1.5 KM | 3 KM | 5 KM
- **Registration Fee:** ₹300 per participant
- **Expected Participants:** 300–500+

## Sections

The application includes the following sections:

1. **Hero** - Event title, date, venue, and call-to-action
2. **About** - Event description and mission
3. **Event Details** - Complete event information
4. **Objectives** - Event objectives
5. **Participant Profile** - Participant statistics and branding opportunities
6. **Registration** - Registration form
7. **Sponsorship** - Main sponsorship tiers (Title Sponsor, Co-Sponsor)
8. **Category Sponsors** - Category-wise sponsorship options
9. **Local Partners** - Local business partnership opportunities
10. **In-Kind Sponsors** - In-kind sponsorship options
11. **Why Partner** - Reasons to partner with the event
12. **Post-Event** - Post-event brand value for sponsors
13. **Contact** - Contact information and conclusion

## Design Integration

The application is structured to easily integrate:
- Design specifications (colors, typography, spacing)
- Custom animations based on design requirements
- Responsive breakpoints matching design
- Image assets (logos, event photos, etc.)

## License

Private project for Ayyapanthangal Marathon 2026
