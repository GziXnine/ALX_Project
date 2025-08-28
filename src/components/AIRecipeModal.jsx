/** @format */
import React, { useState } from "react";
import { X, Sparkles, Plus, Trash2, Clock, Users, Star } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Badge } from "./badge";
import { Card } from "./card";
import { ImageWithFallback } from "./ImageWithFallback";

export default function AIRecipeModal({ onClose, onViewRecipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [step, setStep] = useState("input");

  const addIngredient = () => {
    if (
      currentIngredient.trim() &&
      !ingredients.includes(currentIngredient.trim())
    ) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleGenerateRecipes = async () => {
    if (ingredients.length === 0) return;
    setIsGenerating(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text:
                      `You are an AI chef. Given these ingredients: ${ingredients.join(
                        ", "
                      )}, suggest 3-5 recipes.\n` +
                      `Return ONLY a valid JSON array (no explanations, no markdown, no code block, no extra text).\n` +
                      `Each recipe must have: id, title, cookTime, servings, difficulty (Easy, Medium, Hard), rating (0-5), matchPercentage, missingIngredients, and image (URL).\n` +
                      `For the image field, always use a real, direct image URL from Unsplash, Pexels, or Pixabay that matches the recipe. Do NOT use placeholders, broken links, or AI-generated URLs.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("Gemini Raw Response:", data);

      let aiRecipes = [];
      try {
        // Gemini response is inside candidates[0].content.parts[0].text
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
          // 🛠 Clean Gemini output: extract JSON only
          const jsonMatch = text.match(/\[[\s\S]*\]/); // find array
          if (jsonMatch) {
            aiRecipes = JSON.parse(jsonMatch[0]);
          }
        }
      } catch (err) {
        console.error("Error parsing AI response:", err);
      }

      // Fallback if parsing fails
      if (!Array.isArray(aiRecipes)) {
        aiRecipes = [
          {
            id: "ai-1",
            title: "Simple AI Generated Dish",
            cookTime: "20 mins",
            servings: 2,
            rating: 4.5,
            difficulty: "Easy",
            matchPercentage: 90,
            missingIngredients: [],
            image: "https://source.unsplash.com/600x400/?food,recipe",
          },
        ];
      }

      setSuggestions(aiRecipes);
      setStep("results");
    } catch (error) {
      console.error("Error generating recipes:", error);
    }

    setIsGenerating(false);
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
            {/* Ingredient Input */}
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                What ingredients do you have?
              </h3>
              <p className="text-muted-foreground">
                Add your available ingredients and our AI will suggest perfect
                recipes
              </p>
            </div>

            <div className="max-w-md mx-auto mb-8 flex gap-2">
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

            {/* Ingredients List */}
            {ingredients.length > 0 && (
              <div className="mb-8 text-center">
                <h4 className="font-semibold text-foreground mb-4">
                  Your Ingredients:
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {ingredients.map((ingredient, index) => (
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
            <div className="mb-8 text-center">
              <h4 className="font-semibold text-foreground mb-4">Quick Add:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
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
                        setIngredients([...ingredients, suggestion]);
                      }
                    }}
                    className="px-3 py-2 bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full text-sm transition-all"
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
                className="h-14 px-12 gradient-primary text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                disabled={ingredients.length === 0 || isGenerating}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {suggestions.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="overflow-hidden bg-card border-0 shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
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

                  <div className="px-4 pb-5">
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
                      className="w-full gradient-primary text-white rounded-full hover:shadow-lg transition-all"
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
