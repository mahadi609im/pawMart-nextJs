# PawMart

[Vercel Server Live Site](https://paw-mart-server-smoky.vercel.app/)

PawMart is a community-driven platform for pet adoption and pet-related
products.  
Buyers, adopters, and pet owners can interact, browse, and place orders easily.

## Features

- **Adopt Pets:** Browse pets available for adoption and connect with owners
  directly.
- **Shop Pet Supplies:** Find a variety of pet food, accessories, and care
  products.
- **User Authentication:** Login/Register with Email & Google, secure private
  routes.
- **Add Listings:** Pet owners and shops can add new pets or products with full
  details.
- **Dynamic Search:** Quickly search for pets or products by name.
- **Responsive Design:** Mobile-first design works beautifully on all devices.
- **Notifications:** Alerts for successful actions like listing addition.

## Tech Stack

- **Frontend:** Next.js 16, React, TailwindCSS, next/image, next/router
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** Firebase (Email & Google Login)

## Next.js Specific Notes

- **Image Optimization:** All static images use `next/image` for automatic
  optimization.
- **Head & SEO:** Page titles and meta tags use `next/head`.
- **Routing:** App uses `next/link` and `next/router` for navigation.
- **API Calls:** Server-side API requests handled via `fetch` or Next.js API
  routes.
- **Environment Variables:** Stored in `.env.local` for backend URLs and
  Firebase keys.

## Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/pawmart.git
```

```bash
cd pawmart
```

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run start
```

| Route           | Description                       |
| --------------- | --------------------------------- |
| `/`             | Home page                         |
| `/login`        | User login page                   |
| `/register`     | User registration page            |
| `/add-listing`  | Add new pet/product listing       |
| `/details/[id]` | Pet/product detail page (private) |
| `/my-listings`  | User added listings page          |
