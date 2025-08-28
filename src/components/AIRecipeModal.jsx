/** @format */

import React, { useState } from "react";
import {
  X,
  Sparkles,
  Plus,
  Trash2,
  Search,
  Clock,
  Users,
  Star,
} from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Badge } from "./badge";
import { Card } from "./card";
import { ImageWithFallback } from "./ImageWithFallback";

export default function AIRecipeModal({ onClose, onViewRecipe }) {
  const [ingredients, setIngredients] = useState([""]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [step, setStep] = useState("input");

  const addIngredient = () => {
    if (
      currentIngredient.trim() &&
      !ingredients.includes(currentIngredient.trim())
    ) {
      setIngredients([
        ...ingredients.filter((i) => i),
        currentIngredient.trim(),
      ]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleGenerateRecipes = async () => {
    if (ingredients.filter((i) => i).length === 0) return;
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const mockSuggestions = [
      {
        id: "ai-1",
        title: "Creamy Garlic Pasta with Fresh Herbs",
        image:
          "https://images.unsplash.com/photo-1563379091339-03246963d96c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGdhcmxpYyUyMGNyZWFteXxlbnwxfHx8fDE3NTUwMzUwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        cookTime: "20 mins",
        servings: 4,
        rating: 4.8,
        difficulty: "Easy",
        matchPercentage: 95,
        missingIngredients: ["Heavy cream"],
      },
      {
        id: "ai-2",
        title: "Mediterranean Quinoa Bowl",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGhlYWx0aHklMjBmb29kJTIwY2F0ZWdvcnl8ZW58MXx8fHwxNzU1MDM1Mjk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        cookTime: "15 mins",
        servings: 2,
        rating: 4.6,
        difficulty: "Easy",
        matchPercentage: 87,
        missingIngredients: ["Quinoa", "Feta cheese"],
      },
      {
        id: "ai-3",
        title: "Asian Stir-Fry Noodles",
        image:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHN0aXIlMjBmcnklMjBub29kbGVzfGVufDF8fHx8MTc1NTAzNTA1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        cookTime: "25 mins",
        servings: 3,
        rating: 4.7,
        difficulty: "Medium",
        matchPercentage: 80,
        missingIngredients: ["Soy sauce", "Sesame oil"],
      },
    ];
    setSuggestions(mockSuggestions);
    setIsGenerating(false);
    setStep("results");
  };

  const handleViewRecipe = (recipeId) => {
    onViewRecipe(recipeId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-0 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                AI Recipe Maker
              </h2>
              <p className="text-sm text-muted-foreground">
                Tell us what you have, we'll suggest what to cook
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="w-6 h-6" />
          </Button>
        </div>

        {step === "input" && (
          <div className="p-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                What ingredients do you have?
              </h3>
              <p className="text-muted-foreground">
                Add your available ingredients and our AI will suggest perfect
                recipes
              </p>
            </div>

            {/* Ingredient Input */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter an ingredient..."
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addIngredient()}
                  className="flex-1 h-12"
                />
                <Button
                  onClick={addIngredient}
                  className="h-12 px-6 gradient-primary text-white"
                  disabled={!currentIngredient.trim()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Ingredients List */}
            {ingredients.filter((i) => i).length > 0 && (
              <div className="mb-8">
                <h4 className="font-semibold text-foreground mb-4 text-center">
                  Your Ingredients:
                </h4>
                <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                  {ingredients
                    .filter((i) => i)
                    .map((ingredient, index) => (
                      <Badge
                        key={index}
                        className="px-3 py-2 bg-primary/10 text-primary border border-primary/20 flex items-center gap-2 text-sm"
                      >
                        {ingredient}
                        <button
                          onClick={() => removeIngredient(index)}
                          className="hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                </div>
              </div>
            )}

            {/* Quick Add Suggestions */}
            <div className="mb-8">
              <h4 className="font-semibold text-foreground mb-4 text-center">
                Quick Add:
              </h4>
              <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                {[
                  "Chicken",
                  "Pasta",
                  "Tomatoes",
                  "Onions",
                  "Garlic",
                  "Rice",
                  "Eggs",
                  "Cheese",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      if (!ingredients.includes(suggestion)) {
                        setIngredients([
                          ...ingredients.filter((i) => i),
                          suggestion,
                        ]);
                      }
                    }}
                    className="px-3 py-2 bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full text-sm transition-all duration-200 border border-transparent hover:border-primary/20"
                    disabled={ingredients.includes(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <Button
                onClick={handleGenerateRecipes}
                size="lg"
                className="h-14 px-12 gradient-primary text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                disabled={
                  ingredients.filter((i) => i).length === 0 || isGenerating
                }
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    GENERATING RECIPES...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-3" />
                    GENERATE RECIPES
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "results" && (
          <div className="p-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Perfect Recipes for You
              </h3>
              <p className="text-muted-foreground">
                Based on your ingredients, here are our AI-powered suggestions
              </p>
              <Button
                variant="outline"
                onClick={() => setStep("input")}
                className="mt-4"
              >
                ← Modify Ingredients
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="overflow-hidden bg-card border-0 shadow-card hover:shadow-card-hover transition-all duration-300 group"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-green-500 text-white text-xs px-2 py-1 font-semibold">
                        {recipe.matchPercentage}% MATCH
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge
                        className={`text-xs px-2 py-1 ${
                          recipe.difficulty === "Easy"
                            ? "bg-secondary text-secondary-foreground"
                            : recipe.difficulty === "Medium"
                            ? "bg-orange-500 text-white"
                            : "bg-destructive text-destructive-foreground"
                        }`}
                      >
                        {recipe.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {recipe.title}
                    </h4>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.cookTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{recipe.rating}</span>
                      </div>
                    </div>

                    {recipe.missingIngredients.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">
                          You'll need:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {recipe.missingIngredients.map(
                            (ingredient, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs px-2 py-1"
                              >
                                {ingredient}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={() => handleViewRecipe(recipe.id)}
                      className="w-full gradient-primary text-white rounded-full hover:shadow-lg transition-all duration-300"
                    >
                      VIEW RECIPE
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
