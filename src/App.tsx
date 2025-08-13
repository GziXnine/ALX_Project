import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { SearchResults } from './components/SearchResults';
import { RecipeDetails } from './components/RecipeDetails';
import { AboutPage } from './components/AboutPage';
import { BlogPage } from './components/BlogPage';
import { BlogDetail } from './components/BlogDetail';
import { MealPlanner } from './components/MealPlanner';
import { UserDashboard } from './components/UserDashboard';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { AIRecipeModal } from './components/AIRecipeModal';

type Page = 'home' | 'search' | 'recipe' | 'about' | 'blog' | 'blog-detail' | 'meal-planner' | 'dashboard' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('');
  const [selectedBlogId, setSelectedBlogId] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
  };

  const handleViewRecipe = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
    setCurrentPage('recipe');
  };

  const handleViewBlog = (blogId: string) => {
    setSelectedBlogId(blogId);
    setCurrentPage('blog-detail');
  };

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    if (page === 'home') {
      setSearchQuery('');
    }
  };

  const handleBackToSearch = () => {
    setCurrentPage('search');
  };

  const handleBackToBlog = () => {
    setCurrentPage('blog');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <LandingPage 
            onSearch={handleSearch}
            onViewRecipe={handleViewRecipe}
            onShowAIModal={() => setShowAIModal(true)}
          />
        );
      case 'search':
        return (
          <SearchResults 
            searchQuery={searchQuery}
            onViewRecipe={handleViewRecipe}
          />
        );
      case 'recipe':
        return (
          <RecipeDetails 
            recipeId={selectedRecipeId}
            onBack={handleBackToSearch}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'blog':
        return <BlogPage onViewBlog={handleViewBlog} />;
      case 'blog-detail':
        return <BlogDetail blogId={selectedBlogId} onBack={handleBackToBlog} />;
      case 'meal-planner':
        return <MealPlanner onViewRecipe={handleViewRecipe} />;
      case 'dashboard':
        return <UserDashboard onViewRecipe={handleViewRecipe} />;
      case 'contact':
        return <ContactPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        onSearch={handleSearch}
        currentPage={currentPage}
        onNavigate={handleNavigation}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onShowAIModal={() => setShowAIModal(true)}
      />
      
      <main className="flex-1">
        {renderContent()}
      </main>
      
      <Footer onNavigate={handleNavigation} />

      {showAIModal && (
        <AIRecipeModal 
          onClose={() => setShowAIModal(false)}
          onViewRecipe={handleViewRecipe}
        />
      )}
    </div>
  );
}