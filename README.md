
# Tasty Recipe Finder

A dynamic and responsive React web application that allows users to search for recipes using TheMealDB API, view detailed recipe information, and manage their favorite recipes.

## 🚀 Live Demo

[View Live Application](https://your-deployed-app-url.com)

## 📋 Features Implemented

### Core Features
- **Recipe Search**: Search recipes by name or main ingredient
- **Recipe Details**: View comprehensive recipe information including:
  - Recipe name and image
  - Complete ingredients list with measurements
  - Step-by-step cooking instructions
  - Category and cuisine information
  - Link to video tutorial (when available)
- **Favorites Management**: Mark/unmark recipes as favorites with localStorage persistence
- **Random Recipe Discovery**: Get inspired with random recipe suggestions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Clear visual feedback during API requests
- **Error Handling**: Graceful handling of API failures and empty results

### Technical Features
- **Client-side Routing**: Seamless navigation between pages
- **API Integration**: TheMealDB API integration (no API key required)
- **State Management**: React hooks for efficient state handling
- **Local Storage**: Persistent favorites across browser sessions
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Component Architecture**: Reusable, focused components

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality UI components
- **Tanstack Query** - Data fetching and caching
- **Lucide React** - Beautiful icons
- **TheMealDB API** - Recipe data source

## 🏃‍♂️ Local Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd tasty-recipe-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Design Choices & Architecture

### API Selection
- **TheMealDB API**: Chosen for its simplicity, comprehensive recipe data, and no API key requirement
- **Free tier limitations**: Acknowledged and worked within the constraints

### State Management
- **React Hooks**: Used useState and useEffect for local component state
- **Tanstack Query**: Implemented for server state management, caching, and loading states
- **localStorage**: Selected for favorites persistence as a simple, client-side solution

### Styling Approach
- **Tailwind CSS**: Chosen for rapid development and consistent design system
- **Responsive Design**: Mobile-first approach with breakpoint-specific styling
- **Component Library**: Shadcn/ui for consistent, accessible UI components

### Component Architecture
- **Separation of Concerns**: Clear division between pages, components, and utilities
- **Reusable Components**: RecipeCard and LoadingSpinner for consistency
- **Type Safety**: TypeScript interfaces for recipe data structure

### Routing Strategy
- **React Router**: Implemented for SPA navigation
- **Route Structure**:
  - `/` - Home page with search functionality
  - `/recipe/:id` - Individual recipe details
  - `/favorites` - User's favorite recipes

## 🚧 Challenges Faced & Solutions

### API Limitations
- **Challenge**: TheMealDB API search limitations (exact matches for some endpoints)
- **Solution**: Implemented multiple search strategies and clear user feedback

### State Synchronization
- **Challenge**: Keeping favorites state synchronized across components
- **Solution**: Used localStorage with useEffect hooks for real-time updates

### Responsive Design
- **Challenge**: Ensuring consistent experience across all device sizes
- **Solution**: Implemented mobile-first design with Tailwind's responsive utilities

### Performance Optimization
- **Challenge**: Handling large recipe images and data
- **Solution**: Implemented lazy loading for images and efficient API caching

## 🚀 Deployment

This application can be deployed to various hosting services:

### Recommended Platforms
- **Netlify**: Drag and drop build folder or connect Git repository
- **Vercel**: Connect GitHub repository for automatic deployments
- **GitHub Pages**: Use GitHub Actions for automated deployment

### Deployment Steps (Netlify)
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing by adding a `_redirects` file in the `public` folder:
   ```
   /*    /index.html   200
   ```

### Deployment Steps (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push to main branch

### Environment Variables
No environment variables are required for basic functionality as the app uses TheMealDB's free endpoints.

## 🔄 Git Repository Setup

Initialize and set up your Git repository:

```bash
# Initialize repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Recipe finder application"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/yourusername/tasty-recipe-finder.git

# Push to main branch
git push -u origin main
```

### Repository Hosting Options
- **GitHub**: Most popular, excellent integration with deployment services
- **GitLab**: Good alternative with built-in CI/CD
- **Bitbucket**: Another solid option for code hosting

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Live Application

After deployment, update this section with your live application URL:
- **Production URL**: [Your deployed app URL here]
- **Staging URL**: [Your staging URL if applicable]

## 📧 Contact

For questions or feedback about this project, please open an issue in the repository.
