/** @format */

import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Card } from "../components/card";
import { Badge } from "../components/badge";
import { RecipeCard } from "../components/RecipeCard";
import { useState, useEffect } from "react";
import React from "react";

export function SearchResults({ searchQuery, onViewRecipe }) {
  const [currentQuery, setCurrentQuery] = useState(searchQuery);

  // Sync currentQuery with searchQuery prop
  useEffect(() => {
    setCurrentQuery(searchQuery);
  }, [searchQuery]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch recipes from TheMealDB API
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    let url;
    if (selectedCategory !== "all") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    } else if (currentQuery) {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${currentQuery}`;
    } else {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch recipes.");
        setLoading(false);
      });
  }, [currentQuery, selectedCategory]);

  // Fetch categories from TheMealDB API
  const [categories, setCategories] = useState(["all"]);
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => {
        const cats = (data.meals || []).map((cat) => cat.strCategory);
        setCategories(["all", ...cats]);
      });
  }, []);
  const difficulties = ["all", "Easy", "Medium", "Hard"];

  // Filter recipes by category and difficulty (mocked, since API doesn't provide these fields)
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "all" || recipe.strCategory === selectedCategory;
    // Difficulty is not in API, so always true
    const matchesDifficulty = true;
    const matchesQuery =
      !currentQuery ||
      (recipe.strMeal &&
        recipe.strMeal.toLowerCase().includes(currentQuery.toLowerCase()));
    return matchesCategory && matchesDifficulty && matchesQuery;
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
                className="pl-10 border border-gray-300 bg-white dark:bg-card dark:border-border focus:border-primary focus:ring-0 focus-visible:ring-0"
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
              <div className="grid gap-4">
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
        {loading ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Loading recipes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-lg text-destructive">{error}</p>
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
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
