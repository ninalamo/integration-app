# Integration App

This is a React application built with TypeScript and Vite, featuring a dual-sidebar layout and an integrations management dashboard.

## Prerequisites

Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

### 1. Installation

Clone the repository and install the dependencies:

```bash
cd integration-app
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory and add the following:

```env
VITE_API_URL=http://localhost:4000
```

### 3. Running the Application

This project requires both the **API Server** and the **Frontend App** to be running simultaneously.

#### Option A: Running separately (Manual)

1. **Start the API Server (JSON Server):**
   Open a terminal and run:
   ```bash
   npm run api
   ```
   The API will be available at `http://localhost:4000`.

2. **Start the Frontend App (Vite):**
   Open another terminal and run:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Building for Production

To build the application for production:

```bash
npm run build
```

The output will be in the `dist/` directory. You can preview the production build locally using:

```bash
npm run preview
```

## Project Structure

- `src/components`: Reusable UI components.
- `src/pages`: Main page components.
- `src/layout`: Sidebar and Header layout components.
- `src/constants`: Centralized application constants (API endpoints, branding, etc.).
- `src/services`: API and data services.
- `db.json`: Local database file for the JSON Server.

## Features

- **Integrations Dashboard**: Manage connections with search, sorting, and pagination.
- **Skeleton Loading**: Independent loading states for connectors and existing connections.
- **Premium UI**: Modern design with Tailwind CSS and Font Awesome icons.
- **Confirmation Modals**: Secure workflows for editing and deleting connections.
