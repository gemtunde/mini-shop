This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

# Key Features Implemented:

Core Functionality

- Product Browsing: Grid layout with product cards showing images, titles, prices, ratings
- Advanced Filtering: Search by text, filter by category and price range with debounced search
- Product Details: Modal view with detailed product information and quantity selection
- Shopping Cart: Add/remove items, quantity management, persistent storage
- Responsive Design: Mobile-first approach that works seamlessly across devices

Architecture & Technical Requirements

# Component-Driven Architecture

Atomic design principles with reusable UI components
Feature-based folder structure (/components/products/, /components/cart/, etc.)
Separation of concerns between UI and business logic

# UI & Styling

shadcn/ui components with Tailwind CSS utility classes
Dark/Light theme toggle with system preference detection
Responsive layouts using CSS Grid and Flexbox
Modern design with hover effects and smooth transitions

# State Management

Zustand for centralized state management
Local storage persistence for cart data
Optimistic updates for better user experience

# Data Fetching

Integration with Fake Store API
Loading states with skeleton animations
Error handling with user-friendly messages
Debounced search to optimize API calls

# Performance Optimizations

Next.js Image component with WebP/AVIF support
Lazy loading for images
Code splitting with dynamic imports
Optimized bundle size with tree shaking

# State Management

Zustand for centralized state management
Local storage persistence for cart data
Optimistic updates for better user experience

# Accessibility Features

Semantic HTML structure with proper heading hierarchy
ARIA labels and roles for screen readers
Keyboard navigation support (Tab, Enter, Space)
Focus management and visual focus indicators
High contrast ratios meeting WCAG AA standards

# User Experience:

Mobile-responsive design that works perfectly on all devices
Fast loading with optimized images and efficient state management
Intuitive navigation with clear visual feedback
Accessible for users with disabilities
Persistent cart that remembers items between sessions Accessibility Features

Semantic HTML structure with proper heading hierarchy
ARIA labels and roles for screen readers
Keyboard navigation support (Tab, Enter, Space)
Focus management and visual focus indicators
High contrast ratios meeting WCAG AA standards

# Getting Started:

Create a new Next.js project and copy the code structure
Install the dependencies listed in package.json
Run npm run dev to start the development server
The app will fetch real data from the Fake Store API

# Fake Store API Documentation

Base URL: `https://fakestoreapi.com`

## Products

### Get All Products

```
GET /products
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack",
    "price": 109.95,
    "description": "Your perfect pack for everyday use...",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  }
]
```

### Get Single Product

```
GET /products/{id}
```

**Response:**

```json
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest.",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
```

### Get All Categories

```
GET /products/categories
```

**Response:**

```json
["electronics", "jewelery", "men's clothing", "women's clothing"]
```

### Get Products by Category

```
GET /products/category/{categoryName}
```

**Example:** `/products/category/electronics`

## Product Type Definition

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
```

## Error Handling

- Returns standard HTTP status codes
- `200` - Success
- `404` - Product/Category not found
- `500` - Server error
