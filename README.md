# PawMart - Pet Adoption & Supplies Platform

**Live Site:** [PawMart on Vercel](https://paw-mart-next-js.vercel.app/)  
**Server API:**
[Express Server on Vercel](https://paw-mart-server-smoky.vercel.app/)

PawMart is a modern community-driven platform built with **Next.js 16 (App
Router)**. It allows users to browse pets for adoption and shop for pet
supplies. The application features a secure **Mock Authentication** system with
protected routes for managing pet listings.

---

## 🚀 Technologies Used

- **Frontend:** Next.js 16 (App Router), React, Tailwind CSS.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB.
- **Authentication:** Mock Login System (Cookie-based).
- **Feedback:** SweetAlert2, React Toastify.

---

## 🔑 Login Credentials (Mock)

To access the protected features (Add Product, Manage Products), use the
following credentials:

- **Email:** `admin.maha@gmail.com`
- **Password:** `123456`

---

## ✨ Features

- **Landing Page (7 Sections):** A comprehensive home page including:
  1.  **Hero Section:** High-impact introduction to PawMart.
  2.  **Categories:** Quick links to Pets, Food, and Accessories.
  3.  **Featured Pets:** Showcasing the latest animals for adoption.
  4.  **Our Services:** Details about grooming, care, and supplies.
  5.  **Testimonials:** User experiences and reviews.
  6.  **About Us:** Our mission and community impact.
  7.  **Newsletter:** Stay updated with the latest pet news.
- **Mock Authentication:** Secure login system using hardcoded credentials. User
  sessions are maintained via **Cookies** to simulate real-world auth
  persistence.
- **Protected Routes:** Pages like `/addListing` and `/myListing` are
  restricted. Unauthenticated users are automatically redirected to the `/login`
  page.
- **Public Item List:** Anyone can browse the full collection of pets and
  products fetched dynamically from the Express server.
- **Detailed View:** Specific item details are accessible to everyone, providing
  deep insights into each pet or product.
- **Product Management:** Logged-in users can add new listings and manage their
  existing ones via the Express/MongoDB backend.
- **Interactive UI:** Toast notifications and SweetAlerts for successful actions
  like adding a product or logging out.

---

## 🛠️ Setup & Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/mahadi609im/pawMart-nextJs.git](https://github.com/mahadi609im/pawMart-nextJs.git)
    cd pawmart
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    npm start
    ```

---

## 📍 Route Summary

| Route           | Accessibility | Description                                         |
| :-------------- | :------------ | :-------------------------------------------------- |
| `/`             | **Public**    | Landing page with 7+ sections.                      |
| `/pets`         | **Public**    | Item list page (Pets & Supplies).                   |
| `/details/[id]` | **Public**    | Full details of a single item.                      |
| `/login`        | **Public**    | Mock login page for authentication.                 |
| `/addListing`   | **Protected** | Form to add new items (Redirects if not logged in). |
| `/myListing`    | **Protected** | Page to manage user-specific listings.              |
| `/contact`      | **Public**    | Contact and support information.                    |

---

## 📝 Implementation Notes

- **Authentication Logic:** The app checks for an `auth=true` cookie using
  `useEffect`. If missing on protected routes, it uses `router.push('/login')`
  to redirect the user.
- **API Management:** Data fetching is handled using the native `fetch` API,
  communicating with a hosted Express.js server.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop views
  using Tailwind's utility-first approach.
