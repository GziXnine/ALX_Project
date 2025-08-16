/** @format */

import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { RecipeCard } from "./RecipeCard";
import { useState } from "react";
import React from "react";

export function SearchResults({ searchQuery, onViewRecipe }) {
  const [currentQuery, setCurrentQuery] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Mock search results
  const mockRecipes = [
    {
      id: "1",
      title: "Classic Chicken Parmesan",
      category: "Main Course",
      cuisine: "Italian",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwcGFybWVzYW58ZW58MXx8fHwxNzU1MDM1MjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "45 mins",
      servings: 4,
      rating: 4.7,
      difficulty: "Medium",
      description:
        "Crispy breaded chicken with marinara sauce and melted cheese",
    },
    {
      id: "2",
      title: "Vegetable Stir Fry",
      category: "Vegetarian",
      cuisine: "Asian",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGhlYWx0aHklMjBmb29kJTIwY2F0ZWdvcnl8ZW58MXx8fHwxNzU1MDM0OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "15 mins",
      servings: 3,
      rating: 4.5,
      difficulty: "Easy",
      description: "Fresh vegetables tossed in savory sauce",
    },
    {
      id: "3",
      title: "Beef Tacos",
      category: "Main Course",
      cuisine: "Mexican",
      image:
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMGJlZWZ8ZW58MXx8fHwxNzU1MDM1MjMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "20 mins",
      servings: 4,
      rating: 4.6,
      difficulty: "Easy",
      description: "Seasoned ground beef in soft tortillas with fresh toppings",
    },
    {
      id: "4",
      title: "Chocolate Brownies",
      category: "Dessert",
      cuisine: "American",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBicm93bmllc3xlbnwxfHx8fDE3NTUwMzUyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "35 mins",
      servings: 8,
      rating: 4.8,
      difficulty: "Easy",
      description: "Rich, fudgy chocolate brownies",
    },
    {
      id: "5",
      title: "Caesar Salad",
      category: "Salad",
      cuisine: "Italian",
      image:
        "https://images.unsplash.com/photo-1546793665-c74683f339c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWVzYXIlMjBzYWxhZHxlbnwxfHx8fDE3NTUwMzUyMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "10 mins",
      servings: 2,
      rating: 4.4,
      difficulty: "Easy",
      description: "Classic Caesar salad with crispy croutons and parmesan",
    },
    {
      id: "6",
      title: "Grilled Salmon",
      category: "Main Course",
      cuisine: "Mediterranean",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc2FsbW9ufGVufDF8fHx8MTc1NTAzNTIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "25 mins",
      servings: 4,
      rating: 4.9,
      difficulty: "Medium",
      description: "Perfectly grilled salmon with herbs and lemon",
    },
  ];

  const categories = ["all", "Main Course", "Vegetarian", "Dessert", "Salad"];
  const difficulties = ["all", "Easy", "Medium", "Hard"];

  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "all" || recipe.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || recipe.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {searchQuery ? `Results for "${searchQuery}"` : "All Recipes"}
          </h1>
          <p className="text-muted-foreground">
            Found {filteredRecipes.length} recipes
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search recipes..."
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <Card className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {category === "all" ? "All Categories" : category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Difficulty
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedDifficulty === difficulty
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {difficulty === "all" ? "All Levels" : difficulty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Active Filters */}
        {(selectedCategory !== "all" || selectedDifficulty !== "all") && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Active filters:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedDifficulty !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedDifficulty}
                  <button
                    onClick={() => setSelectedDifficulty("all")}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Results Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onViewRecipe={onViewRecipe}
                size="medium"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No recipes found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or filters
            </p>
            <Button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDifficulty("all");
              }}
              variant="outline"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
