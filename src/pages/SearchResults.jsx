/** @format */

import {
  Search,
  Filter,
  SlidersHorizontal,
  Shuffle,
  Globe,
  Leaf,
} from "lucide-react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Card } from "../components/card";
import { Badge } from "../components/badge";
import { RecipeCard } from "../components/RecipeCard";
import { useState, useEffect } from "react";
import React from "react";

export function SearchResults({ searchQuery, onViewRecipe }) {
  // New states for API features
  const [firstLetter, setFirstLetter] = useState("");
  const [areas, setAreas] = useState(["all"]);
  const [selectedArea, setSelectedArea] = useState("all");
  const [ingredients, setIngredients] = useState(["all"]);
  const [selectedIngredient, setSelectedIngredient] = useState("all");
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
    let url = "";
    if (selectedCategory !== "all") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    } else if (selectedArea !== "all") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
    } else if (selectedIngredient !== "all") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`;
    } else if (firstLetter) {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
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
  }, [
    currentQuery,
    selectedCategory,
    selectedArea,
    selectedIngredient,
    firstLetter,
  ]);

  // Fetch categories, areas, ingredients from TheMealDB API
  const [categories, setCategories] = useState(["all"]);
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => {
        const cats = (data.meals || []).map((cat) => cat.strCategory);
        setCategories(["all", ...cats]);
      });
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((res) => res.json())
      .then((data) => {
        const areas = (data.meals || []).map((a) => a.strArea);
        setAreas(["all", ...areas]);
      });
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) => res.json())
      .then((data) => {
        const ings = (data.meals || []).map((i) => i.strIngredient);
        setIngredients(["all", ...ings]);
      });
  }, []);
  const difficulties = ["all", "Easy", "Medium", "Hard"];

  // No need to filter further, API already filters by selected criteria
  const filteredRecipes = recipes;

  return (
    <div className="min-h-screen bg-background py-8 sm:py-8">
      <div className="container px-2 sm:px-0">
        {/* Search Header */}
        <div className="text-center mb-12 sm:mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            {searchQuery ? `Results for "${searchQuery}"` : "All Recipes"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Found {filteredRecipes.length} recipes
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 sm:mb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-stretch sm:items-center mb-4">
            {/* Search Bar */}
            <div className="relative w-full max-w-xs mx-auto sm:max-w-md lg:max-w-md lg:mx-0">
              <Input
                type="text"
                placeholder="Search recipes..."
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                className="pl-10 border border-gray-300 bg-white dark:bg-card dark:border-border focus:border-primary focus:ring-0 focus-visible:ring-0 text-sm sm:text-base py-1.5 sm:py-2"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            </div>

            {/* First Letter Search - horizontal scroll on mobile with thin scrollbar */}
            <div className="flex gap-1 items-center overflow-x-auto py-1 px-1 sm:px-0 sm:thin-scrollbar group-hover:bg-primary/90 transition-colors">
              {[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    setFirstLetter(letter.toLowerCase());
                    setCurrentQuery("");
                  }}
                  className={`min-w-[28px] px-2 py-1 rounded text-xs font-bold transition-colors ${
                    firstLetter === letter.toLowerCase()
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                  title={`Search by '${letter}'`}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Controls stack vertically on mobile */}
            <div className="flex gap-2 flex-col sm:flex-row w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => {
                  setLoading(true);
                  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
                    .then((res) => res.json())
                    .then((data) => {
                      setRecipes(data.meals || []);
                      setLoading(false);
                    });
                }}
                className="flex items-left gap-2 w-full sm:w-auto"
              >
                <Shuffle className="w-4 h-4" />
                Random Meal
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
          {showFilters && (
            <Card className="p-4">
              <div className="grid gap-4">
                {/* Category Filter */}
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
                {/* Area Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Area / Cuisine
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {areas.map((area) => (
                      <button
                        key={area}
                        onClick={() => setSelectedArea(area)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedArea === area
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {area === "all" ? "All Areas" : area}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Ingredient Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ingredient
                  </label>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {ingredients.slice(0, 50).map((ingredient) => (
                      <button
                        key={ingredient}
                        onClick={() => setSelectedIngredient(ingredient)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedIngredient === ingredient
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {ingredient === "all" ? "All Ingredients" : ingredient}
                        {ingredient !== "all" && (
                          <img
                            src={`https://www.themealdb.com/images/ingredients/${ingredient}-small.png`}
                            alt={ingredient}
                            className="inline-block w-5 h-5 ml-2 rounded-full border border-border"
                          />
                        )}
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
          <div
            className={`grid ${
              filteredRecipes.length === 1
                ? "grid-cols-1"
                : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
            } gap-4 lg:gap-5 sm:gap-3`}
          >
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
          <div className="text-center py-10 sm:py-16">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Search className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground" />
            </div>
            <h3 className="text-base sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">
              No recipes found
            </h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
              Try adjusting your search terms or filters
            </p>
            <Button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDifficulty("all");
              }}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
