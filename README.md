# HomeHub Finder

Create a modern, responsive frontend-only PG/Hostel discovery website called PGFinder, designed primarily for college students and young professionals looking for PGs, hostels, and shared rooms near colleges and workplaces.

IMPORTANT:

Build FRONTEND ONLY.

Do not create a backend, database, authentication system, payment system, or real API integration.

Use realistic mock data for PG listings, reviews, locations, prices, and amenities.

All buttons, filters, search, navigation, favorites, and UI interactions should work on the frontend using local/mock state.

Make the website production-quality, visually polished, and mobile responsive.

BRAND

Name: PGFinder
Tagline: "Find a place that feels like home."

Design style:

Modern startup/SaaS aesthetic

Clean and spacious layout

Student-friendly

Professional but friendly

Rounded cards

Subtle shadows

Smooth hover animations

Attractive typography

Use a consistent modern color palette

Avoid an overly corporate appearance

PAGES

1. HOME PAGE

Create a visually impressive landing page.

Hero section:

Large headline: "Find Your Perfect PG Near Your College"

Supporting text: "Compare PGs, hostels and shared rooms by price, location, amenities and real student reviews."

Large search box

Search fields:

"Enter college, area or city"

"Move-in date"

"Budget"

Primary button: "Search PGs"

Add quick location chips:

Coimbatore

Chennai

Bangalore

Hyderabad

Pune

Add a "Why PGFinder?" section with 4 feature cards:

Verified Listings

Student Reviews

Easy Comparison

Nearby Locations

Add a "Popular PGs" section containing attractive property cards.

Each card should show:

Property image

PG name

Location

Distance from college

Monthly rent

Rating

Number of reviews

Amenities

Gender type

"View Details" button

Heart/favorite button

Add a "Find PGs Near Top Colleges" section.

Example colleges:

PSG College of Technology

Anna University

IIT Madras

SRM University

Amrita University

Add a CTA section:
"Ready to find your new home?"
Button: "Explore PGs"

Footer:

PGFinder logo

About

Contact

Help

Terms

Privacy

Social media icons

2. SEARCH / LISTINGS PAGE

Create a two-column desktop layout.

LEFT:
Filter sidebar containing:

Location

Search location

Monthly Budget

Minimum price

Maximum price

Range slider

Room Type

Single

Double Sharing

Triple Sharing

4 Sharing

Gender

Male

Female

Unisex

Amenities

Wi-Fi

Food

Laundry

AC

Parking

Gym

Housekeeping

Study Room

Distance

Within 1 km

Within 3 km

Within 5 km

Within 10 km

Rating

4+ stars

3+ stars

RIGHT:

Search bar at top

Result count

Sort dropdown:

Recommended

Price: Low to High

Price: High to Low

Highest Rated

Nearest

Display PG cards in a responsive grid.

Add pagination or "Load More" button.

Filters must visually respond using mock data.

3. PG DETAILS PAGE

Create a detailed property page.

Top:

Large image gallery

Multiple thumbnail images

Favorite button

Share button

Property information:

PG name

Location

Rating

Reviews

Distance from nearby colleges

Monthly rent

Security deposit

Available from

Room options:

Single Room

Double Sharing

Triple Sharing

Each room option should show:

Price

Room image

Occupancy

Availability

"Select Room"

Amenities section with icons.

Description section.

House rules:

Entry timings

Visitors

Food

Smoking

Pets

Security

Nearby places:

College

Bus stop

Railway station

Hospital

Supermarket

Reviews section:
Create realistic mock student reviews with:

Avatar

Name

Rating

Date

Review text

Right-side sticky booking/contact card:

Monthly rent

Deposit

Selected room

"Contact Owner"

"Schedule Visit"

Do NOT implement actual booking/payment functionality.

4. COMPARE PAGE

Create a comparison interface.

Allow users to select up to 3 PGs.

Comparison table columns:

PG name

Location

Monthly rent

Deposit

Distance

Rating

Room type

Food

Wi-Fi

Laundry

AC

Parking

Security

Overall score

Highlight the best value in each category.

Add "View Details" buttons.

5. FAVORITES PAGE

Create a page showing saved PGs.

Display:

Property cards

Remove favorite button

View details button

Price

Rating

Location

Empty state:
"No saved PGs yet"
"Save PGs you like and compare them later."

Button:
"Explore PGs"

6. MAP VIEW

Create a frontend-only map-style interface.

Since there is no backend/API:

Create a visually convincing static map UI using a placeholder/map-style background.

Add mock location pins.

Clicking a pin should display a small PG preview card.

Include a list of nearby PGs on the side.

Add filters at the top.

Do not use real map API integration.

7. NAVIGATION

Desktop navbar:

PGFinder logo

Find PGs

Compare

Favorites

Map

"List Your PG" button

Profile icon

Mobile:

Hamburger menu

Bottom navigation with:

Home

Search

Favorites

Compare

Profile

MOCK DATA

Create at least 12 realistic PG listings.

Example:

PG Name:
"GreenNest Premium PG"

Location:
"Peelamedu, Coimbatore"

Rent:
₹7,500/month

Rating:
4.6

Distance:
1.2 km from PSG Tech

Amenities:
Wi-Fi, Food, Laundry, AC, Parking

Room types:
Single, Double, Triple

Create different prices, locations, ratings, amenities and room types for the other listings.

Use realistic Indian cities and college areas.

INTERACTIONS

Implement frontend interactions using local state:

Search PGs

Filter listings

Sort listings

Favorite/unfavorite PGs

Open PG details

Select room type

Compare PGs

Remove comparison

Open map preview

Mobile navigation

Image gallery

Review section

Schedule visit modal

Contact owner modal

For Contact Owner and Schedule Visit:
Use frontend modal forms only.

Example Schedule Visit fields:

Name

Phone

Preferred date

Preferred time

After submission, show a success message such as:
"Visit request submitted successfully!"

No actual API call.

RESPONSIVE DESIGN

The website must work beautifully on:

Desktop

Laptop

Tablet

Mobile

Mobile listing cards should become single-column.

Filters should become a bottom-sheet or modal on mobile.

The PG details page should stack vertically on mobile.

UI DETAILS

Use:

Modern icons

Property photos

Consistent spacing

Rounded corners

Hover effects

Smooth transitions

Skeleton loading states where appropriate

Toast notifications

Empty states

Error states

Accessible buttons and form controls

Avoid:

Generic template appearance

Excessive gradients

Cluttered screens

Tiny text

Broken layouts

Placeholder lorem ipsum

Make it feel like a real startup product similar in quality to a modern property marketplace.

FINAL REQUIREMENT

Build the complete frontend with reusable components and clean structure.

The final result should feel like a real commercial product called PGFinder, not a basic college project.

Use mock data throughout and clearly keep the architecture frontend-only so a backend/API can be connected later.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://nestly-find-your-place.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f72b68ad-7908-4ddc-9a86-18824da0479f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
