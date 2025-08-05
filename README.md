# Glorious Beauty Store

A modern, responsive cosmetics e-commerce website built with React, TypeScript, and Vite. This project features user authentication with OTP verification and a clean, intuitive UI for browsing and purchasing beauty products.

## Features

- 🛍️ Browse a wide range of beauty products
- 🔐 User authentication with OTP verification
- 🛒 Shopping cart functionality
- 📱 Fully responsive design for all devices
- ⚡ Built with Vite for fast development and optimized builds
- 🔄 LocalStorage-based user data management
- 🔄 Password reset functionality

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Modules
- **State Management**: React Context API
- **Routing**: React Router
- **Build Tool**: Vite
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/glorious-beauty-store.git
   cd glorious-beauty-store
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for deployment on Vercel. To deploy:

1. Push your code to a GitHub repository
2. Sign in to [Vercel](https://vercel.com/)
3. Click "Add New" > "Project"
4. Import your GitHub repository
5. Vercel will automatically detect the Vite configuration and set up the project
6. Click "Deploy"

Your site will be live at `https://your-project-name.vercel.app`

## OTP Verification

For demo purposes, the OTP is displayed on the screen. In a production environment, you would integrate with an SMS service like Twilio or Firebase Auth.
