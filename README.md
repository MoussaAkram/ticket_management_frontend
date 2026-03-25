# Gestion des Demandes — Frontend

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

## Project Overview

This frontend provides a simple and clear interface for the ticket management workflow. Users can create requests, track their progress through a status stepper, and consult the full history of every action taken on a ticket via an audit timeline.

## Core Features

- **Demandes** — paginated list of all active demandes with status filter
- **Create and edit** — form with validation and assignee selection
- **Detail page** — full ticket information with an interactive status stepper
- **Audit timeline** — chronological history of all actions with metadata diffs
- **Status management** — transition buttons enforce the workflow defined by the backend

## Technology Stack

- **Framework**: Angular 18
- **Styling**: Tailwind CSS

## Getting Started

Follow these steps to set up the frontend locally.

### Prerequisites

- Node.js 24
- Backend running at `http://localhost:3000`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API URL in `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
};
```

Change `apiUrl` if your backend runs on a different port or host.

4. Start the development server:
```bash
npm start
# or
ng serve
```

Open your browser and navigate to `http://localhost:4200`.

## Contributing

1. Fork the repository.
2. Create a new branch:
```bash
git checkout -b feature/YourFeature
```
3. Commit your changes:
```bash
git commit -m "Add YourFeature"
```
4. Push to the branch:
```bash
git push origin feature/YourFeature
```
5. Open a pull request.