/** @format */

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { LandingPage } from "./pages/LandingPage";
import { SearchResults } from "./components/SearchResults";
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
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
