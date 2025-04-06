# Mainstack Dashboard Application

A modern, responsive dashboard application built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive interface for managing and visualizing transaction data.

## Features

- **Transaction Management**

  - View and filter transactions
  - Detailed transaction information
  - Status tracking and filtering
  - Date range filtering

- **User Interface**

  - Modern, clean design
  - Responsive layout
  - Custom font integration (Degular)
  - Loading states and skeletons

- **Technical Features**
  - TypeScript for type safety
  - React Router for navigation
  - Redux for state management
  - Vitest for testing
  - Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd mainstack-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Testing

The project uses Vitest for testing. To run the tests:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Project Structure

```
src/
├── assets/          # Static assets and fonts
├── components/      # Reusable UI components
├── contexts/        # React contexts
├── layouts/         # Layout components
├── redux/           # Redux store and slices
├── types/           # TypeScript type definitions
└── __tests__/       # Test files
```

## Technologies Used

- **Frontend Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux
- **Routing**: React Router
- **Testing**: Vitest, React Testing Library
- **Font**: Degular

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
