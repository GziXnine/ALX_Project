/** @format */

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { LandingPage } from "./pages/LandingPage";
import { SearchResults } from "./pages/SearchResults";
import { RecipeDetails } from "./pages/RecipeDetails";
import { AboutPage } from "./pages/AboutPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogDetail } from "./pages/BlogDetail";
import { MealPlanner } from "./pages/MealPlanner";
import { UserDashboard } from "./pages/UserDashboard";
import { ContactPage } from "./pages/ContactPage";
import { Footer } from "./components/Footer";
import AIRecipeModal from "./components/AIRecipeModal";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [selectedBlogId, setSelectedBlogId] = useState("");
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark" || stored === "floral")
      return stored;
    return "light";
  });
  const [showAIModal, setShowAIModal] = useState(false);

  useEffect(() => {
    document.body.classList.remove("light", "dark", "floral");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage("search");
  };

  const handleViewRecipe = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setCurrentPage("recipe");
  };

  const handleViewBlog = (blogId) => {
    setSelectedBlogId(blogId);
    setCurrentPage("blog-detail");
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (page === "home") {
      setSearchQuery("");
    }
  };

  const handleBackToSearch = () => {
    setCurrentPage("search");
  };

  const handleBackToBlog = () => {
    setCurrentPage("blog");
  };

  // Cycle theme logic for Header
  const handleThemeToggle = () => {
    let nextTheme;
    if (theme === "light") nextTheme = "floral";
    else if (theme === "floral") nextTheme = "dark";
    else if (theme === "dark") nextTheme = "light";
    else nextTheme = "light";
    setTheme(nextTheme);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <LandingPage
            onSearch={handleSearch}
            onViewRecipe={handleViewRecipe}
            onShowAIModal={() => setShowAIModal(true)}
          />
        );
      case "search":
        return (
          <SearchResults
            searchQuery={searchQuery}
            onViewRecipe={handleViewRecipe}
          />
        );
      case "recipe":
        return (
          <RecipeDetails
            recipeId={selectedRecipeId}
            onBack={handleBackToSearch}
          />
        );
      case "about":
        return <AboutPage />;
      case "blog":
        return <BlogPage onViewBlog={handleViewBlog} />;
      case "blog-detail":
        return <BlogDetail blogId={selectedBlogId} onBack={handleBackToBlog} />;
      case "meal-planner":
        return <MealPlanner onViewRecipe={handleViewRecipe} />;
      case "dashboard":
        return <UserDashboard onViewRecipe={handleViewRecipe} />;
      case "contact":
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
        currentTheme={theme}
        onToggleTheme={handleThemeToggle}
        onShowAIModal={() => setShowAIModal(true)}
      />
      <main className="flex-1">{renderContent()}</main>
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
