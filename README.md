# Recipe Hub - Discover & Manage Recipes

A modern, full-featured recipe management application built with React, TypeScript, Redux Toolkit, and RTK Query. Browse thousands of recipes, search and filter by various criteria, and manage your own recipe collection with full CRUD capabilities.

## Live Demo

[View Live Application](#) - Deploy link will be added after deployment

## Features

### Landing Page
- **Hero Section**: Eye-catching hero with clear call-to-action buttons
- **Recipe Browsing**: Browse through a vast collection of recipes with beautiful card layouts
- **Search Functionality**: Search recipes by name or ingredients
- **Advanced Sorting**: Sort recipes by name, rating, prep time, or calories (ascending/descending)
- **Pagination**: Navigate through recipes with smooth pagination controls
- **Responsive Design**: Fully responsive layout that works on all devices

### Authentication
- **Secure Login**: User authentication using JWT tokens
- **Protected Routes**: Dashboard access restricted to authenticated users only
- **User Profile Display**: View logged-in user information with profile picture
- **Persistent Sessions**: Sessions persist across page refreshes using localStorage

### Dashboard (Authenticated Users Only)
- **Create Recipes**: Add new recipes with detailed information including:
  - Recipe name, cuisine, and difficulty level
  - Prep time, cook time, and servings
  - Multiple ingredients and step-by-step instructions
  - Tags and meal types
  - Calorie information
  - Recipe images
- **Update Recipes**: Edit existing recipes with a user-friendly modal interface
- **Delete Recipes**: Remove recipes with confirmation dialogs
- **Recipe Management**: View all recipes in an organized grid layout

## Technologies Used

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **RTK Query** - Powerful data fetching and caching
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Next-generation build tool

### API Integration
- **DummyJSON API** - Recipe data and authentication
  - `/recipes` - Recipe listing with pagination
  - `/recipes/search` - Recipe search functionality
  - `/auth/login` - User authentication
  - `/auth/me` - User profile information

### Code Quality
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Path Aliases** - Clean imports with `@/` prefix

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Hero.tsx        # Landing page hero section
│   ├── RecipeCard.tsx  # Recipe display card
│   ├── RecipesSection.tsx  # Recipe listing with filters
│   ├── RecipeModal.tsx     # Create/Edit recipe modal
│   └── ProtectedRoute.tsx  # Route protection wrapper
├── features/           # Redux slices
│   └── authSlice.ts    # Authentication state management
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # Login page
│   └── Dashboard.tsx   # Recipe management dashboard
├── services/           # RTK Query API services
│   ├── api.ts          # Base API configuration
│   ├── authApi.ts      # Authentication endpoints
│   └── recipesApi.ts   # Recipe CRUD endpoints
├── store/              # Redux store configuration
│   ├── index.ts        # Store setup
│   └── hooks.ts        # Typed Redux hooks
├── App.tsx             # Main app component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recipe-hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Browsing Recipes
1. Visit the home page to see the hero section
2. Scroll down to browse recipes
3. Use the search bar to find specific recipes
4. Apply sorting options (name, rating, prep time, calories)
5. Navigate through pages using pagination controls

### Managing Recipes (Requires Authentication)
1. Click "Manage Recipes" or "Sign In" button
2. Use the demo credentials:
   - Username: `emilys`
   - Password: `emilyspass`
3. Access the dashboard to:
   - Create new recipes using the "Create Recipe" button
   - Edit existing recipes by clicking the "Edit" button on any recipe card
   - Delete recipes by clicking the "Delete" button (with confirmation)
4. Logout when done

## API Endpoints Used

### Recipes
- `GET /recipes?limit={limit}&skip={skip}` - Get paginated recipes
- `GET /recipes/search?q={query}` - Search recipes
- `GET /recipes?sortBy={field}&order={asc|desc}` - Sorted recipes
- `POST /recipes/add` - Create new recipe (authenticated)
- `PUT /recipes/{id}` - Update recipe (authenticated)
- `DELETE /recipes/{id}` - Delete recipe (authenticated)

### Authentication
- `POST /auth/login` - User login (returns JWT token)
- `GET /auth/me` - Get current user profile (requires token)

## Key Features Implementation

### Path Aliases
The project uses path aliases for cleaner imports:
```typescript
import { store } from '@/store';
import RecipeCard from '@/components/RecipeCard';
```

### Redux Toolkit Query
RTK Query handles all API calls with automatic caching and state management:
```typescript
const { data, isLoading } = useGetRecipesQuery({ limit: 12, skip: 0 });
```

### Protected Routes
The dashboard is protected and requires authentication:
```typescript
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### Responsive Design
All components are fully responsive using Tailwind CSS's mobile-first approach with breakpoints for tablets and desktops.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Recipe data provided by [DummyJSON API](https://dummyjson.com)
- Icons by [Lucide](https://lucide.dev)
- Stock images from [Pexels](https://pexels.com)

## Contact

For questions or feedback, please open an issue on GitHub.

---

Built with React, TypeScript, and Redux Toolkit Query
