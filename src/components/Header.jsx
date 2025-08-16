/** @format */

import { useState } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";

export function Header({
  currentPage = "home",
  onNavigate,
  isDarkMode = false,
  onToggleTheme,
  onShowAIModal,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);

  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
    setFeaturesDropdownOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home", page: "home" },
    { id: "search", label: "Recipes", page: "search" },
    { id: "about", label: "About", page: "about" },
    { id: "contact", label: "Contact", page: "contact" },
  ];

  const featureItems = [
    { id: "meal-planner", label: "Meal Planner", page: "meal-planner" },
    { id: "blog", label: "Blog", page: "blog" },
    { id: "dashboard", label: "Dashboard", page: "dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md shadow-sm">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavigation("home")}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <span className="text-primary-foreground font-bold text-sm">
                🍴
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                RecipeFinder
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5">
                Discover & Cook
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.page)}
                className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                  currentPage === item.page
                    ? "text-primary bg-primary/10 shadow-sm"
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFeaturesDropdownOpen(!featuresDropdownOpen)}
                className="flex items-center px-4 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-xl transition-all duration-200"
              >
                Features
                <ChevronDown
                  className={`ml-1.5 w-4 h-4 transition-transform duration-200 ${
                    featuresDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {featuresDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="py-2">
                    {featureItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavigation(item.page)}
                        className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-accent/50 transition-colors ${
                          currentPage === item.page
                            ? "text-primary bg-primary/10"
                            : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                    <div className="border-t border-border/50 mt-2 pt-2">
                      <button
                        onClick={onShowAIModal}
                        className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-accent/50 transition-colors font-medium"
                      >
                        ✨ AI Recipe Maker
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTheme}
              className="ml-2 p-2.5 rounded-xl hover:bg-accent/50 transition-all duration-200"
              title={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
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
              className="p-2.5 rounded-xl hover:bg-accent/50 transition-all duration-200"
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
              className="p-2.5 rounded-xl hover:bg-accent/50 transition-all duration-200"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/50 bg-card/50 backdrop-blur-sm">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.page)}
                  className={`px-4 py-3 text-sm font-medium text-left rounded-xl transition-all duration-200 ${
                    currentPage === item.page
                      ? "text-primary bg-primary/10 shadow-sm"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-border/50 mt-4">
                <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Features
                </p>
                {featureItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.page)}
                    className={`px-4 py-3 text-sm font-medium text-left rounded-xl transition-all duration-200 ${
                      currentPage === item.page
                        ? "text-primary bg-primary/10 shadow-sm"
                        : "text-foreground hover:text-primary hover:bg-accent/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={onShowAIModal}
                  className="px-4 py-3 text-sm font-medium text-left text-foreground hover:text-primary hover:bg-accent/50 rounded-xl transition-all duration-200"
                >
                  ✨ AI Recipe Maker
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
