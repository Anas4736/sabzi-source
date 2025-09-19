# Street Vendor Raw Material Sourcing Platform

 ![Project Banner](./assets/screenshot.png)

---

## Table of Contents

- [About](#about)  
- [Problem Statement](#problem-statement)  
- [Solution](#solution)  
- [Features](#features)  
- [How It Works](#how-it-works)  
- [Tech Stack](#tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Usage](#usage)  
- [Screenshots](#screenshots)  
- [Future Improvements](#future-improvements)  
- [Team](#team)  
- [License](#license)

---

## About

This project is a web application designed to help street food vendors in India source raw materials from trusted suppliers at affordable rates. It bridges the gap between small vendors and reliable vendors, ensuring quality, transparency, and cost-effectiveness.

---

## Problem Statement

Street food vendors in India often face challenges such as:

- Difficulty in finding suppliers who are both **reliable** and **inexpensive**.  
- Lack of trust in vendor quality, leading to risk in food safety.  
- Inconsistent supply, fluctuating prices, and lack of transparency.  
- Time and cost lost in travel or dealing with middlemen.

---

## Solution

Our platform allows vendors to:

- Browse and connect with **trusted suppliers** of raw materials.  
- Compare prices from different vendors.  
- Browse product catalogs with quality indicators (ratings, reviews, etc.).  
- Place orders online and arrange delivery or pickup.

---

## Features

- Vendor dashboard: Suppliers can list their raw materials, set prices, update inventory.  
- Vendor verification system: Ensures suppliers are authenticated/trusted.  
- Search & filter: Vendors can filter raw materials by price, location, quality rating.  
- Order management: Vendors can place, view, track orders.  
- Notification system: For new product listings, order status updates, stock shortages.  
- User-friendly UI/UX optimized for mobile and low-bandwidth usage.

---

## How It Works

1. **Supplier registration**: Raw material suppliers register, provide verification details, upload product catalog.  
2. **Vendor browsing**: Street food vendors register/log in, browse through product listings.  
3. **Filtering & comparison**: Vendors compare multiple supplier listings based on price, quality, and distance.  
4. **Placing orders**: Vendors place orders, choose delivery or pickup options.  
5. **Order tracking & feedback**: Vendors track order status; they can leave feedback to maintain trust.

---

## Tech Stack

| Component       | Technology / Tool         |
|------------------|-----------------------------|
| Frontend         | React / Vue / Angular / Svelte (whichever you used) |
| Backend          | Node.js / Express / Django / Flask / etc. |
| Database         | PostgreSQL / MySQL / MongoDB / etc. |
| Authentication   | JWT / OAuth / etc. |
| Hosting / Deployment | AWS / Heroku / Netlify / Vercel / etc. |
| Notifications    | Email / SMS / Push / etc. |

---

## Setup & Installation

> The steps below assume you are running this in a development environment.

```bash
# Clone the repo
git clone <your-repo-url>
cd <your-project-directory>

# Install dependencies
npm install

# Configuration
# Create `.env` file with:
#   DATABASE_URL=...
#   JWT_SECRET=...
#   PAYMENT_API_KEY=...
#   etc.

# Run in development
cd backen
npm run dev
npm run start
