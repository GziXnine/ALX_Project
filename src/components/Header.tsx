import { useState } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onSearch?: (query: string) => void;
  currentPage?: 'home' | 'search' | 'recipe' | 'about' | 'blog' | 'blog-detail' | 'meal-planner' | 'dashboard' | 'contact';
  onNavigate?: (page: 'home' | 'search' | 'recipe' | 'about' | 'blog' | 'blog-detail' | 'meal-planner' | 'dashboard' | 'contact') => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onShowAIModal?: () => void;
}

export function Header({ 
  currentPage = 'home', 
  onNavigate,
  isDarkMode = false,
  onToggleTheme,
  onShowAIModal
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);

  const handleNavigation = (page: 'home' | 'search' | 'recipe' | 'about' | 'blog' | 'blog-detail' | 'meal-planner' | 'dashboard' | 'contact') => {
    if (onNavigate) {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
    setFeaturesDropdownOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', page: 'home' as const },
    { id: 'search', label: 'Recipes', page: 'search' as const },
    { id: 'about', label: 'About', page: 'about' as const },
    { id: 'contact', label: 'Contact', page: 'contact' as const }
  ];

  const featureItems = [
    { id: 'meal-planner', label: 'Meal Planner', page: 'meal-planner' as const },
    { id: 'blog', label: 'Blog', page: 'blog' as const },
    { id: 'dashboard', label: 'Dashboard', page: 'dashboard' as const }
  ];

  return (
    <header className="border-b border-border bg-background">
      <div className="container">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => handleNavigation('home')}
          >
            <h1 className="text-lg font-semibold text-foreground">RecipeFinder</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.page)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === item.page
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-accent'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFeaturesDropdownOpen(!featuresDropdownOpen)}
                className="flex items-center px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
              >
                Features
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {featuresDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-card border border-border rounded-md shadow-lg z-50">
                  {featureItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.page)}
                      className={`block w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors first:rounded-t-md last:rounded-b-md ${
                        currentPage === item.page ? 'text-primary bg-primary/10' : 'text-foreground'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="border-t border-border">
                    <button
                      onClick={onShowAIModal}
                      className="block w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors rounded-b-md"
                    >
                      AI Recipe Maker
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTheme}
              className="ml-2 p-2"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTheme}
              className="p-2"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.page)}
                  className={`px-3 py-2 text-sm font-medium text-left rounded-md transition-colors ${
                    currentPage === item.page
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-accent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-2 border-t border-border mt-2">
                <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">Features</p>
                {featureItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.page)}
                    className={`px-3 py-2 text-sm font-medium text-left rounded-md transition-colors ${
                      currentPage === item.page
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground hover:text-primary hover:bg-accent'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={onShowAIModal}
                  className="px-3 py-2 text-sm font-medium text-left text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                >
                  AI Recipe Maker
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Close dropdown when clicking outside */}
      {featuresDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setFeaturesDropdownOpen(false)}
        />
      )}
    </header>
  );
}