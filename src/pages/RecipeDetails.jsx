/** @format */

import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  Printer,
  ChefHat,
} from "lucide-react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { Badge } from "../components/badge";
import { Separator } from "../components/separator";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { useState } from "react";
import React from "react";

export function RecipeDetails({ recipeId, onBack }) {
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  React.useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setError("Recipe not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch recipe details.");
        setLoading(false);
      });
  }, [recipeId]);

  const toggleIngredient = (index) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading recipe...</p>
      </div>
    );
  }
  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-destructive">
          {error || "Recipe not found."}
        </p>
      </div>
    );
  }

  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ item: ingredient, amount: measure });
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image and Title */}
            <div>
              <ImageWithFallback
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />

              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {recipe.strCategory}
                  </Badge>
                  <Badge variant="outline">{recipe.strArea}</Badge>
                </div>

                <h1 className="text-3xl font-bold text-foreground mb-3">
                  {recipe.strMeal}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {recipe.strInstructions}
                </p>
              </div>
            </div>

            {/* Ingredients */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Ingredients
              </h2>
              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 cursor-pointer hover:bg-accent rounded-lg p-2 -m-2 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checkedIngredients.has(index)}
                      onChange={() => {
                        const newChecked = new Set(checkedIngredients);
                        if (newChecked.has(index)) {
                          newChecked.delete(index);
                        } else {
                          newChecked.add(index);
                        }
                        setCheckedIngredients(newChecked);
                      }}
                      className="rounded border-border"
                    />
                    <div className="flex-1">
                      <span
                        className={`text-sm ${
                          checkedIngredients.has(index)
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        <span className="font-medium">{ingredient.amount}</span>{" "}
                        {ingredient.item}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </Card>

            {/* YouTube Video */}
            {recipe.strYoutube && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Video Tutorial
                </h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${
                      recipe.strYoutube.split("v=")[1]
                    }`}
                    title="YouTube video"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-64 rounded-lg"
                  ></iframe>
                </div>
              </Card>
            )}

            {/* Source Link */}
            {recipe.strSource && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Source
                </h2>
                <a
                  href={recipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  View full recipe on TheMealDB
                </a>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <Card className="p-4">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-3"
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-xs">Save</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-3"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs">Share</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-3"
                >
                  <Printer className="w-4 h-4" />
                  <span className="text-xs">Print</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
