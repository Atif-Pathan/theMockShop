# The Edit: A Modern E-Commerce Experience 🛍️

## 🚀 _**[Live Link - explore the curated collection here!](https://editshop.vercel.app/)**_

## 💡 Overview

This project, developed as part of The Odin Project's React curriculum, is a fully-featured mock e-commerce platform. It was built to master modern React concepts, including **data-driven routing**, **comprehensive testing**, and **robust state management**. Users can browse products, filter results, and manage a persistent shopping cart that saves across sessions in a clean, responsive interface.

## 🛠️ Core Concepts & Implementation

### 1. Data-Driven Routing with React Router

The application is built on React Router v6, leveraging its modern data-loading APIs for a performant user experience.

- **Loaders:** Instead of `useEffect`, routes like `/shop` use `loader` functions to fetch data _before_ the page renders, eliminating loading spinners and layout shifts.
- **Centralized State:** The root `<App>` component manages the shopping cart state and passes it down efficiently to all child routes using the `useOutletContext` hook, avoiding prop-drilling.
- **Robust Error Handling:** A root `errorElement` is configured to gracefully catch and display errors from data loading or rendering, preventing a full-page crash and improving user experience.

### 2. Comprehensive Testing (Vitest & React Testing Library)

A primary goal was to build a professional test suite that focuses on user behavior, not implementation details.

- **Integration First:** The suite is anchored by full-app integration tests that simulate complete user journeys, such as adding an item on the `ShopPage` and verifying the `<Header>` cart badge updates correctly.
- **Focused Page Tests:** Individual page tests isolate components by mocking React Router hooks (`useLoaderData`, `useOutletContext`), allowing for fast and focused testing of page-specific logic without needing to render the entire application.
- **Mocking & Isolation:** All external dependencies (like the products API) are mocked in a global `setup.js` file, ensuring tests are fast, reliable, and predictable.
- **Accessible Queries:** Tests exclusively use accessibility-first queries (`getByRole`, `getByLabelText`) to find elements, making the suite resilient to stylistic changes and ensuring the application is built with accessibility in mind.

### 3. Key Features & Implementation Details

- **Persistent State Management:** The shopping cart logic is cleanly managed in the top-level `<App>` component with `useState`. The cart state is hydrated from `localStorage` on initial load using a lazy initializer for performance and is synced back to `localStorage` on every change with `useEffect`.
- **Component Validation:** `PropTypes` are used across all components to enforce type-checking, catch potential bugs during development, and serve as clear documentation for each component's API.
- **Dynamic Theming:** A custom `ThemeContext` provides a light/dark mode toggle. The user's preference is persisted across sessions, and even the site's favicon dynamically changes to match the active theme!
- **Scoped Styling:** `CSS Modules` are used for all styling to ensure class names are locally scoped, preventing style collisions and making components truly self-contained.

## 🎯 What I Learned

- **The Power of Integration Testing:** I learned that while unit tests are valuable, full-app integration tests are also required and should not be skipped as they can help catch bugs that only appear when multiple components, context, and state interact.
- **Modern Data Fetching:** Using React Router's `loader` functions proved to be a superior pattern to traditional `useEffect` fetching, simplifying component logic and improving perceived performance.
- **Pragmatic State Management:** This project demonstrated that for many applications, a well-structured combination of `useState` and `context` is a powerful and sufficient state management solution.

## 🛠️ Technologies

- **Framework:** React + Vite
- **Routing:** React Router v6
- **Testing:** Vitest, React Testing Library, `user-event`
- **Styling:** CSS Modules
- **Type Checking:** PropTypes
- **Deployment:** Vercel

## 🔮 Future Improvements

- **Checkout Integration:** Integrate a payment gateway like Stripe for a complete, functional checkout process.
- **User Authentication:** Add user accounts (e.g., via Firebase or Supabase) to allow for saved carts across devices and order history.
