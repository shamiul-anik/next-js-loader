# Osaka Masjid Loader Test Project

This project is designed to test the **Osaka Masjid Loader** component within a Next.js application. It features a premium, spiritual-themed loading experience with smooth animations and integration with a database.

## Features

- **Thematic Design**: Spiritual and elegant aesthetics featuring "Osaka Masjid".
- **Animated Loader**: Circular SVG animation with a progress bar and smooth exit scaling.
- **Next.js 16+ Support**: Built using the latest Next.js features and App Router.
- **Database Integration**: Fetches sample user data from a Turso database upon completion of the loading animation.
- **Client-Side Rendering**: Optimized for client-side interactions and smooth visual transitions.

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [Turso (SQLite)](https://turso.tech/)
- **Icons**: Font Awesome (pulp-effect icons)

## Getting Started

### Prerequisites

- Node.js installed
- A Turso Database URL and Auth Token (set in `.env`)

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   bun install
   ```

### Running Locally

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/components/Loader/`: Contains the `Loader.jsx` component and its CSS.
- `app/page.tsx`: The main page demonstrating the loader usage and data fetching.
- `app/api/users/`: A sample API route interacting with Turso DB.

## Development

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
